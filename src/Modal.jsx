import { useEffect, useState } from "react"
import infoIcon from "./assets/info.svg"
import addIcon from "./assets/add.svg"
import closeIcon from "./assets/close.svg"

export default function Modal(){
    const [tag, setTag] = useState("")
    const [tagArray, setTagArray] = useState([])
    const submitTag = (e)=>{
        e.preventDefault()

        if (tagArray.length >= 8) {
            alert("You can only add up to 8 tags.");
            return
        }

        if (!tag.trim()) {
            alert("Tag cannot be empty.");
            return
        }

        setTagArray([...tagArray, tag])
        setTag("")
    }

    //get from local storage
    useEffect(()=>{
        const storedTags = localStorage.getItem("AllTags")
        if (storedTags) {
            try {
                setTagArray(JSON.parse(storedTags));
            } catch (error) {
                console.error("Failed to parse stored tags:", error);
                localStorage.removeItem("AllTags");
            }
        }
    }, [])

    //save to local storage
    useEffect(()=>{
        	localStorage.setItem("AllTags", JSON.stringify(tagArray))
    }, [tagArray])
    
    //delete tag
    const deleteTag = (index) => {
        const updatedTags = tagArray.filter((_, ind) => ind !== index);
        setTagArray(updatedTags);
    }


    return(
        <div className="modal-container">
            <div className="top-section">
                <div className="title">
                    <div className="add-tags">
                        <h3>Add Tags</h3>
                        <p>(max.8)</p>
                    </div>
                    <div className="info-icon">
                        <img src={infoIcon} alt="info-icon" />
                    </div>
                </div>

                <form className="form" onSubmit={submitTag}>
                    <input 
                    type="text" 
                    name="tag"
                    placeholder="Add tags..."
                    value={tag || ""}
                    onChange={(e)=>{setTag(e.target.value)}}
                    />

                    <button className="add-button" type="submit">
                        <img src={addIcon} alt="" />
                    </button>
                </form>


                {/* display to ui */}
            <div className="all-tags">
            {
                    tagArray.map((tag, index)=>(
                        <div className="tags" key={index}>
                            <p>{tag}</p>
                            <button className="remove-button" onClick={() => deleteTag(index)}>
                                <img src={closeIcon} alt="delete-icon" />
                            </button>
                        </div>
                    ))
                }
            </div>
            </div>

            <div className="middle-section">
                <div className="mid-title">
                    <h3>Members with access</h3>
                </div>
                <div className="check-items">
                    <div className="check-one">
                        <div className="check-details">
                            <input type="checkbox" id="check-one" name="checkboxes"/>
                            <label htmlFor="check-one">Display on profile</label>
                        </div>
                        <button className="check-tag">NEW</button>
                    </div>
                    <div className="check-details">
                            <input type="checkbox" id="check-two" name="checkboxes"/>
                            <label htmlFor="check-two">Disable commenting</label>
                    </div>
                </div>
            </div>
            
            <div className="bottom-section">
                <div className="left-details">
                    <h3>Add to portfolio</h3>
                    <p>Choose a portfolio to add to your work</p>
                </div>
                <div className="right-details">
                    <button>Choose</button>
                </div>
            </div>

        </div>
    )
}