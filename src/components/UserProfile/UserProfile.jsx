import React ,{useEffect, useState}  from "react"; 
import { OutlinedInput , FormControl ,Select , InputLabel , MenuItem, Typography , Button ,Input} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import "./userProfile.css";



const UserProfile = ()=>{


    const [userProfile , setUserProfile] = useState({
        fullname : '',
        age : '' ,
        nationality : '',
        sex : '',
    })
    const [userCard , setUserCard ] = useState([]);
    const [imagePreview , setImagePreview] = useState(null);
    

     
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
        setUserCard(data.map((user)=>({...user , image : user.imageURL})))
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
    

    const handleSubmit = async (e)=>{
     
        e.preventDefault();
        try{
            const response = await fetch('/api/userProfile',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json' , 
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    userProfile: {
                        fullName: userProfile.fullname,  
                        age: userProfile.age,           
                        nationality: userProfile.nationality,
                        sex: userProfile.sex
                    },
                    imageURL : imagePreview                     
                })
            })
            if(!response.ok){
                throw new Error("Error adding the data to the userProfile")
            }

        }finally{
        setUserProfile({
            fullname : '',
            age : '' ,
            nationality : '',
            sex : '',
        })
        setImagePreview(null);
        
    }}

    const handleImage = (e)=>{
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                console.log('Base64 Image:', reader.result); // Debug: Check the Base64 string
                setImagePreview(reader.result); // Set the Base64 string as `imagePreview`
            };
            reader.readAsDataURL(file); // Converts file to Base64
        }

    }


    return (
        <div>
              <div className="userForm">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <InputLabel>Name</InputLabel>
                    <OutlinedInput
                      type="text"
                      name="fullname"
                      value={userProfile.fullname}
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
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={handleImage} />
                  </FormControl>
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
              </div>
        
            {userCard.map((user) => (
              <div className="userCard" key={user.userId}>
                <PersonIcon />
                {user.image && <img src={user.image} alt={user.fullname} />}
                <Typography variant="subtitle1">Full Name: {user.fullname}</Typography>
                <Typography variant="subtitle1">Age: {user.age}</Typography>
                <Typography variant="subtitle1">Nationality: {user.nationality}</Typography>
                <Typography variant="subtitle1">Sex: {user.sex}</Typography>
              </div>
            ))
        }
        </div>
      );
}

export default UserProfile;