import React from "react";

const UserData = (props) => {



    return (
<div>
<p>{props.user.name}
</p>
<p>{props.user.email}</p>
</div>
   
   
    )
};
export default UserData;