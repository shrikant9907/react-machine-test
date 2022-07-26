import React from 'react'
 
export default function AlertBox(props) {

  let alertClasses = 'alert alertui1 ';

  if (props.type && props.type !== '') {
    alertClasses += `alert-${props.type}`;
  } else {
    alertClasses += `alert-success`;
  }

  if (props.dismissible) {
    alertClasses += ' dismissible fade show';
  }

  const handleAlertClose = () => {
    if (props.onClick) {
      props.onClick()
    } 
  }
 
  return (
    <div className={alertClasses}>
      {props.message ? props.message : ''}
      {props.dismissible && <button type="button" onClick={() => handleAlertClose()} className="close btn-close"></button>}
    </div>    
  )
}