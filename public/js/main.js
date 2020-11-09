import { getFormInputs, submitData } from './requests.js';
import { checkAllValid } from './validation.js';
import nav from './nav.js';

nav();

// URLS -------------------
const signupSubmitUrl = '/signup-submit';
const emailSubmitUrl = '/email-submit';

// MODAL ------------
const modal = document.querySelector('.modal');
const signupInitBtn = document.querySelector('#signup-init .btn.btn-primary'); 
// Open
signupInitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('#signup-init input').value;
    document.getElementById('email').value = email;  // --dispay initial email on form
    submitData({ email: email }, emailSubmitUrl); // --post email

    if (modal.style.display === 'none') {
        modal.style.display = 'block';
    }
    /*
    const scrollY = document.body.style.top; // --prevent backdrop page scroll
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed'; 
    */
    // Close
}); const closeModal = document.getElementById('close-modal'); // Open
        closeModal.addEventListener('click', (e) => {
        modal.style.display = 'none';
    
        const scrollY = document.body.style.top; // --return to  previous position on page
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        e.preventDefault();
        
    }); 



// Select ->  Other field
const selectFields = document.querySelectorAll('select');  // --get doms (!) cleanup

const skillsetWrapper = document.getElementById('skillset-wrapper'); // --skillset
const newDiv = document.querySelector('.flex-item.other')
const newField = document.getElementById('skillset-other');

const lookingForWrapper = document.getElementById('lookingfor-wrapper'); // --looking for
const newDiv2 = document.querySelector('.flex-item.other.two')
const newField2 = document.getElementById('looking-for-other');

selectFields.forEach(selectField => {
    selectField.addEventListener('change', (e) => {
        if (selectField.value == 'Other skillset') {
            skillsetWrapper.className = 'flex-row';
            document.getElementById('looking-for-other').value = '';
            newDiv.style = 'display: block';
            newField.focus();
        } else if (selectField.value == 'Looking for other') {
            lookingForWrapper.className = 'flex-row';
            document.getElementById('looking-for-other').value = '';
            newDiv2.style = 'display: block';
            newField2.focus();
        } else if (selectField.value !== 'Other skillset' && selectField.name == 'looking-for' ){
            lookingForWrapper.className = 'flex-col';
            newDiv2.firstElementChild.className = 'field inactive'; // --checkAllValid chekcs if this class is active or not / do better
            newDiv2.style = 'display: none';
        } else {
            skillsetWrapper.className = 'flex-col';
            document.getElementById('skillset-other').value = '';
            newDiv.firstElementChild.className = 'field inactive';
            newDiv.style = 'display: none'; // (!) inject 'other field?
        }
    }); 
})

// Check All Valid & Submit Form
const signupForm = document.getElementById('signup-form');
const renderFeedback = document.querySelector('.validation-feedback');
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (checkAllValid(signupForm) > 0) {
        renderFeedback.style = 'opacity: 1';
    } else {
        console.log(getFormInputs());
        renderFeedback.style = 'color: orange';
        renderFeedback.innerHTML = 'Sending... :|`';
        const response  = await submitData(getFormInputs(), signupSubmitUrl);
        if (response.ok){
            renderFeedback.style = 'display: none';
            document.getElementById('modal-footer').style = 'display: none;'
            document.getElementById('signup-body').style = 'display: none;';
            signupForm.firstElementChild.firstElementChild.innerHTML = 'Sweet! We got it. We\'ll let you know when we\'re ready to ship.'
            // signupForm.firstElementChild.firstElementChild. = 'Sweet! We got it. We\'ll let you know when we\'re ready to ship.'

        } else {
            renderFeedback.style = 'color: red';
            renderFeedback.innerHTML = 'Darn :( There was a problem on our end... Give it another shot.`';
            console.log(response);
        }
    }
});

