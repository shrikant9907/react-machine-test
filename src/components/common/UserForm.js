import React, { useState, useEffect } from 'react';
import 'react-phone-number-input/style.css'
import './UserForm.scss'
import PhoneInput from 'react-phone-number-input'
import Select from 'react-select'
import AlertBox from './AlertBox';
import JSONDebug from './JSONDebug';  
import { useNavigate, useSearchParams  } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import localDb from '../../_services/localStorageDataService';
import { toast } from 'react-toastify'; 

const options = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' }
]

const UserForm = (props) => {

  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
 
  let userId = '';
  let pageType = 'Add';
  if (searchParams.has("uid")) {
    userId = searchParams.get('uid');
    pageType = 'Edit';
  }
 
  const initFormData = {
    "image": "",
    "name": "",
    "age": "",
    "occupation": "",
    "gender": "",
    "mobile": "",
    "phone": "",
    "address": "",
    "id": ""
  }
 
  const [usersData, setUsersData] = useState([]);
  const [formData, setFormData] = useState(initFormData);
  const [error, setError] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
    const users = localDb.get('users');
    setUsersData(users);

    if (pageType === 'Edit') {
      const foundUser = users.find(obj => obj.id === userId)
      if (foundUser !== undefined) {
       setFormData(foundUser)
      }
    }

  }, [pageType, userId])

  const formMessage = {
    emptyForm: "Form is empty",
    duplicate: "Duplicate entry not allowed",
    mobileError: "Mobile Number should be unique.",
    formSuccess: "Message sent successfully. Thank you form contacting us.",
  }

  const openDetails = () => {
   setTimeout(() => {
    navigate("../user-details", { success: true })
   }, 2000);
  }
 
  const resetForm = () => {
    setError(false);
    setFormData(initFormData);

    setTimeout(() => {
      setSubmitStatus(false)
    }, 2000);
  }

  const handleFieldChange = async (e, field = 'default') => {

    if (field === 'default') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    if (field === 'phone' || field === 'mobile') {
      setFormData({ ...formData, [field]: e });
    }

    if (field === 'mobile') {
      if (e !== '') {
        const fu = usersData.findIndex(u => u.mobile === e)
        if (fu > 0) {
          setError(true);
        } else {
          setError(false);
        }
      }
    }

    if (field === 'gender') {
      setFormData({ ...formData, [field]: e.value });
    }

    if (field === 'image') {
      const file = e.target.files[0];
      const base64Image = await fileToBase64(file)
      setFormData({ ...formData, [field]: base64Image });
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (JSON.stringify(formData) === '{}' ||  Object.values(formData).every(data => data === '')) {
      setError(true);
      toast.error(formMessage.emptyForm)
      return
    }

    if (!submitStatus && !error && pageType === "Add") {
      setSubmitStatus(true)
      await addUserToLocalStorage(formData);
      resetForm(true)
      openDetails()
    } 

    if (!submitStatus && !error && pageType === "Edit") {
      setSubmitStatus(true)
      updateUserToLocalStorage(userId, formData);
      openDetails()
    } 
  };

  const addUserToLocalStorage = (orgUser) => {
    let users = localDb.get('users');
    let user = Object.assign({}, orgUser);
    user.id = uuidv4();

    console.log('sdfsdfds', user)

    const uidx = users.slice().findIndex(u => {
      if (u.id) {
        delete u.id;
      }    
      if (user.id) {
        delete user.id;
      }   
      return (JSON.stringify(u) === JSON.stringify(user)) 
    })
   
    const umidx = users.findIndex(u => u.mobile === user.mobile)

    if (uidx > 0) {
      toast.error(formMessage.duplicate)
    } else if (umidx > 0) {
      toast.error(formMessage.mobileError)
    } else {
      users = [...users, user]
      localDb.set('users', users);
    }
    setSubmitStatus(false)
  }

  const updateUserToLocalStorage = (id, user) => {
    let users = localDb.get('users');
    const newUsers = [...users]
    const uidx = users.findIndex(u => u.id === id)
    newUsers[uidx] = user;
    localDb.set('users', newUsers);
    toast.success('User updated successfully.')
  }

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


  return (

    <div className="card cui2 py_30 px_20 rs-contact-form">
      <div className="card-body pb-0">
      <h3 className="text-center">{pageType} User Details</h3>
      
        <form className="fui fui2"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>
                  Image:
                </label>
                {/* <input
                  maxLength="300"
                  onChange={(e) => handleFieldChange(e)}
                  name="image"
                  value={formData?.image}
                  type="text"
                  className="form-control w-100"
                  placeholder="Image URL"
                /> */}
                {pageType === 'Edit' && formData.image !== '' && 
                  <div className="mb-3">
                    <img src={formData?.image} height={70} width={70} alt="" className='img-thumbnail' />
                  </div>
                }
                <input
                  maxLength="300"
                  onChange={(e) => handleFieldChange(e, 'image')}
                  name="image"
                  type="file"
                  placeholder="Image"
                />
                {pageType === 'Edit' &&
                  <p className='text-muted f12 mt-1'>New Image will replace the current image.</p>
                }
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="form-group">
                <label>
                  Name:
                </label>
                <input
                  maxLength="50"
                  onChange={(e) => handleFieldChange(e)}
                  name="name"
                  value={formData?.name}
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-group">
                <label>
                  Age:
                </label>
                <input
                  max="200"
                  min="1"
                  onChange={(e) => handleFieldChange(e)}
                  name="age"
                  value={formData?.age}
                  type="number"
                  className="form-control"
                  placeholder="Age"
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-group">
                <label>
                  Occupation:
                </label>
                <input
                  maxLength="200"
                  onChange={(e) => handleFieldChange(e)}
                  name="occupation"
                  value={formData?.occupation}
                  type="text"
                  className="form-control"
                  placeholder="Occupation"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-4">
              <div className="form-group">
                <label>
                  Gender:
                </label>
                <Select
                  maxLength="15"
                  options={options}
                  onChange={(e) => handleFieldChange(e, 'gender')}
                  name="gender"
                  value={[options.find(option => option.value === formData.gender)]}
                  className="form-control"
                  placeholder="Gender"
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-group">
                <label>
                  Mobile:
                </label>
                {error && formData?.mobile && <AlertBox type='danger' message={formMessage.mobileError} />}
                <PhoneInput
                  maxLength="15"
                  className="form-control"
                  placeholder="Mobile"
                  value={formData?.mobile}
                  onChange={(e) => handleFieldChange(e, 'mobile')}
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-group">
                <label>
                  Phone:
                </label>
                <PhoneInput
                  maxLength="15"
                  className="form-control"
                  placeholder="Phone"
                  value={formData?.phone}
                  onChange={(e) => handleFieldChange(e, 'phone')}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>
              Address:
            </label>
            <textarea
              maxLength="200"
              rows={5}
              onChange={(e) => handleFieldChange(e)}
              placeholder="Address"
              value={formData?.address}
              name="address"
              className="form-control"></textarea>
          </div>
          <div className="form-group d-flex align-items-center justify-content-center">
          {pageType === "Add" && 
            <button onClick={() => resetForm()} className="btn btn-outline-primary me-2 btnui2" type="button" name="reset" value="Reset">Reset</button>
          }
           <input disabled={submitStatus} className="btn btn-primary btnui2" type="submit" name="submit" value={(pageType === "Add" ? "Submit" : "Update") } />
          </div>
          {submitStatus && <AlertBox type='success' message={formMessage.formSuccess} />}
        </form>
      </div>
      <JSONDebug data={formData} />
    </div>
  )
}

export default UserForm