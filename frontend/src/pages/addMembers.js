import React from "react";

function addMembers(){
  const [memName, setMemName] = useState("");
  const [type, setType] = useState("");

  const addMember = () => {
    console.log("In addMember() function")
    if((type.toLowerCase() != "platinum") && (type.toLowerCase() != "gold") && (type.toLowerCase() != "silver") && (type.toLowerCase() != "bronze")){
      alert("Wrong account type!");
    }
    Axios.post("http://localhost:3001/create_acc", {
      memName: memName,
      type: type,
    }).then(() => {
      console.log("successfully added");
    });
  };

  return(
    <div>
      <h1>Add Members Page</h1>
      <div className="Information">
        <label>Name:</label>
        <input
          type = "text"
          name = "memName"
          onChange={(event) => {
            setMemName(event.target.value);
          }}
        />

        <br></br>
        <label>Account Type:</label>
        <input
          type = "text"
          name = "type"
          onChange={(event) => {
            setType(event.target.value);
          }}
        />
        
        <br></br>
        <button onClick={addMember}>Add Member</button>
        <br></br>
      </div>
    </div>
  );
}

export default addMembers;