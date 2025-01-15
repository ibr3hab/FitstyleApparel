import React ,{useEffect, useState}  from "react"; 
import { OutlinedInput , FormControl ,Select , InputLabel , MenuItem, Typography , Button ,Input} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import "./userProfile.css";



const UserProfile = ()=>{


    const [userProfile , setUserProfile] = useState({
        fullName : '',
        age : '' ,
        nationality : '',
        sex : '',
    })
    const [userCard , setUserCard ] = useState([]);
    // const [imagePreview , setImagePreview] = useState(null);
    


    const fetchProducts = async()=>{
    try{
        const response = await fetch('/api/userProfile' , {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(!response.ok){
            throw new Error("Error fetching the data");
        }
        const data = await response.json();
        console.log("The output",data); 
        setUserCard(data);
    }catch(err){
        console.error("Error getting the data of the of the users");
    }
   }

 

   useEffect(()=>{
    fetchProducts();
   },[])

  

    const handleChange = (e)=>{
           const {name , value} = e.target;
           setUserProfile((prevValue)=>({
            ...prevValue,
            [name] : value,
           }))
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the user profile data to the backend without the image part
            const response = await fetch('/api/userProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    fullName: userProfile.fullName,
                    age: userProfile.age,
                    nationality: userProfile.nationality,
                    sex: userProfile.sex,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Error adding the data to the userProfile');
            }


            fetchProducts();
    
        }  
        finally {
            // Reset the form fields after submission
            setUserProfile({
                fullName: '',
                age: '',
                nationality: '',
                sex: '',
            });
        }
    };
    

    // const handleImage = (e)=>{
    //     const file = e.target.files[0];
    //     if(file){
    //         const url = URL.createObjectURL(file);
    //         console.log('Image Preview URL:', url); // Debug: Check the generated preview URL
    //         setImagePreview(url);
    //     }

    // }


    return (
        <div>

            { userCard.length === 0 ? (
              <div className="userForm">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <InputLabel>Name</InputLabel>
                    <OutlinedInput
                      type="text"
                      name="fullName"
                      value={userProfile.fullName}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel>Age</InputLabel>
                    <OutlinedInput
                      type="number"
                      name="age"
                      value={userProfile.age}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel>Nationality</InputLabel>
                    <OutlinedInput
                      type="text"
                      name="nationality"
                      value={userProfile.nationality}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  {/* <FormControl>
                    <Input type="file" accept="image/*" onChange={handleImage} />
                  </FormControl> */}
                  <FormControl>
                    <Select value={userProfile.sex} onChange={handleChange} name="sex">
                      <InputLabel>Sex</InputLabel>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <Button type="submit">Create Profile</Button>
                </form>
              </div> ) : (
             <div className="contUser">
            {userCard.map((user) => (
              <div className="userCard" key={user.userId}>
                <PersonIcon />
                {/* {user.image && <img src={user.image} alt={user.fullname} />} */}
                <Typography variant="subtitle1">Full Name: {user.fullName}</Typography>
                <Typography variant="subtitle1">Age: {user.age}</Typography>
                <Typography variant="subtitle1">Nationality: {user.nationality}</Typography>
                <Typography variant="subtitle1">Sex: {user.sex}</Typography>
              </div>
            ))
        }
        </div>)
}
        </div>
      );
}

export default UserProfile;