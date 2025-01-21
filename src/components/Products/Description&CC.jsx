import React  ,{useState , useContext , createContext} from "react";


const DescriptionContext = createContext();

export const DescriptionProvider = ({children})=>{

    const [count , setCount] = useState({})
    const [isDescription , setiSDescription] = useState({})


    const descriptionVisible = (id)=>{
        setiSDescription((prevValue)=>(
            {
                ...prevValue,
                [id] : !prevValue[id]
            }
        ))
    }

    const countCart = (id)=>{
        setCount((prevValue)=>({
            ...prevValue,
            [id] : prevValue[id] ? prevValue[id] + 1 :1 
        }))
    }

    return(
        <DescriptionContext.Provider value={{countCart , count , isDescription , descriptionVisible}}>
            {children}
        </DescriptionContext.Provider>
    )
}

export const useDesc = ()=> useContext(DescriptionContext);




