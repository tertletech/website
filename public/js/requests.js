// DOMS - Get form values and return object
const getFormInputs = () => {
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const postcode = document.getElementById('postcode').value;
        const skillset = document.getElementById('skillset').value;
        const lookingFor = document.getElementById('looking-for').value;
        const linkedIn = document.getElementById('linkedin').value;
        return {
            email,
            firstName,
            lastName,
            postcode, 
            linkedIn, 
            skillset, 
            lookingFor
        }
        /*
        return {
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            postcode: postcode.value,
            linkedIn: linkedIn.value,
            skillset: skillset.value,
            lookingFor: lookingFor.value,
        }
        */
    };
    
// Post something
const submitData = async (data, url) => {
    try {
        const response = await fetch(url, { 
            method: 'POST', 
            headers: {'Content-type': 'application/json' },
            body: JSON.stringify(data) 
        })
        if (response.ok) {
            const jsonResponse = await response.json();
            return console.log('Submission successful');
            
        }
    } catch (err) {
        console.log(err);
    }
};

const getEmail = () => {
    const email = document.querySelector('#signup-init input').value;
    // submitData({ email: email }, emailSubmitUrl);
    return email;
};
    
export { getFormInputs, submitData, getEmail };