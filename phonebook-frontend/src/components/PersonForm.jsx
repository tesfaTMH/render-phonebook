export const PersonForm = ({newName, setNewName, newPhone, setNewPhone, addPerson}) => {
    return (
      <div>
        <form onSubmit={addPerson} name="personform">
          <div>
            <strong>Name</strong>: <input
                    name="personname" 
                    type="text"
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                    placeholder="Enter your name..."
                  />
          </div>
          <div>
          <strong>Phone</strong>: <input
                    name="phone"
                    type="text"
                    value={newPhone}
                    onChange={(event) => setNewPhone(event.target.value)}
                    placeholder="Enter your phone number..."
                  />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    )
  }
  