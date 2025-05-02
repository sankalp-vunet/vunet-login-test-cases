// Valid credentials for testing
const VALID_CREDENTIALS = {
    username: "vunet",
    password: "asdfg@123"
};

// Test case descriptions
const testCases = {
    1: "Valid Login\n\nSteps:\n1. Enter username: 'vunet'\n2. Enter password: 'asdfg@123'\n3. Click 'Sign in' button\n\nExpected Result:\n- Success message appears\n- Button changes to 'Signing in...' state",

    2: "Invalid Username\n\nSteps:\n1. Enter any username except 'vunet' (e.g., 'wronguser')\n2. Enter any password\n3. Click 'Sign in' button\n\nExpected Result:\n- Error message: 'Username or email does not exist'",

    3: "Invalid Password\n\nSteps:\n1. Enter username: 'vunet'\n2. Enter incorrect password\n3. Click 'Sign in' button\n\nExpected Result:\n- Error message: 'Your password does not match your username or email'",

    4: "Empty Fields Validation\n\nSteps:\n1. Leave both fields empty\n2. Click in username field, then tab out\n3. Click in password field, then tab out\n\nExpected Result:\n- Red border appears around empty fields\n- Tooltips appear showing 'field is blank' messages\n- Sign in button remains disabled",

    5: "Focus State Behavior\n\nSteps:\n1. Click in username field\n2. Type partial text\n3. Click outside the login card\n4. Repeat for password field\n\nExpected Result:\n- Any visible tooltips should disappear\n- Field borders return to normal state\n- Form state is preserved",

    6: "Password Visibility Toggle\n\nSteps:\n1. Enter some text in password field\n2. Click the eye icon to show password\n3. Click again to hide password\n4. Clear the field\n\nExpected Result:\n- Eye icon appears only when field has text\n- Password toggles between visible and hidden\n- Eye icon disappears when field is empty",

    7: "Keyboard Navigation\n\nSteps:\n1. Press Tab to move through fields\n2. Use Enter key in fields\n3. Use Shift+Tab to move backwards\n\nExpected Result:\n- Tab order: Username → Password → Password visibility toggle → Sign in button → Forget password\n- Enter in fields triggers form submission\n- Focus indicators visible on all interactive elements",

    8: "Forgot Password Flow\n\nSteps:\n1. Click 'Forgot password?' link\n2. Observe the new card\n3. Enter any text in email field\n4. Click 'Submit'\n5. Observe 'Check your inbox for a reset link' message\n6. Return to login with email preserved in username field\n\nExpected Result:\n- Switches to password reset card\n- Submit button enables with any input\n- Shows success message on submit\n- Email is preserved in username field\n- Password field is cleared",

    9: "Return to Login\n\nSteps:\n1. Enter partial credentials\n2. Switch to forgot password\n3. Return to login\n\nExpected Result:\n- Form fields should be cleared\n- No error states persist\n- Sign in button returns to default state",

    10: "Alert Behavior\n\nSteps:\n1. Trigger an error (e.g., wrong password)\n2. Quickly trigger another error\n\nExpected Result:\n- New alerts replace existing ones\n- Alerts remain visible until next action\n- Alerts don't stack or overlap",
    
    12: "Input Length Limits\n\nSteps:\n1. Try entering very long text in username field\n2. Try entering very long text in password field\n3. Observe input behavior\n\nExpected Result:\n- Fields should handle long inputs appropriately\n- No unexpected UI breakage\n- Input validation remains functional",
    
    13: "Special Character Handling\n\nSteps:\n1. Enter username with special characters (@, #, $)\n2. Enter password with special characters\n3. Submit the form\n\nExpected Result:\n- Special characters are properly handled\n- No unexpected validation errors\n- Form submits correctly",
    
    14: "Copy & Paste Behavior\n\nSteps:\n1. Copy text and paste into username field\n2. Copy text and paste into password field\n3. Observe field behavior\n\nExpected Result:\n- Fields accept pasted content\n- Proper formatting is maintained\n- Button states update accordingly",
    
    15: "Auto-fill Integration\n\nSteps:\n1. Allow browser to offer saved credentials\n2. Accept browser auto-fill\n3. Observe form state\n\nExpected Result:\n- Auto-filled fields are properly recognized\n- Button states update correctly\n- Form styling remains consistent",
    
    16: "Input Field Behavior\n\nSteps:\n1. Enter credentials\n2. Trigger an error\n3. Observe which fields are cleared\n\nExpected Result:\n- Password field should clear after errors\n- Username field should persist\n- Error states should display correctly",
    
    17: "Session Timeout A\n \nContext: When you're ON the platform, and inactive for more than the specified time, then you're signed out.\n \n  Steps:\n1. Observe the notification banner\n\nExpected Result:\n- Banner displays 'Signed out due to inactivity'\n- After five minutes of inactivity, users are automatically logged out\n- Users must log in again to continue\n",
    
    18: "Session Timeout B\n \nContext: When you're only on the login page for more than 5 minutes, then the session expires and the login page auto-refreshes. \n \nSteps:\n1. Observe the notification banner\n\nExpected Result:\n- Banner displays 'Sign-in timed out. Please start over'\n- If you're on the login page for more than 5 minutes, the login session refreshes\n- Users need to restart their login process\n",

    0: "Master Prototype\n\nThis is a fully functional prototype combining all test cases below. All interactions, validations, and behaviors are available to test in this mode.\n\nYou can:\n- Test valid and invalid logins\n- Trigger error states and alerts\n- Test form validations\n- Try password visibility toggle\n- Use forgot password flow\n- Test special character handling\n- Try copy/paste behavior\n- Test auto-fill capabilities\n- Observe field clearing timing\n- and more..."
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
// DOM Elements
const loginForm = document.getElementById('login-form');
const resetForm = document.getElementById('reset-form');
const loginCard = document.getElementById('login-card');
const forgotPasswordCard = document.getElementById('forgot-password-card');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const resetEmailInput = document.getElementById('reset-email');
const signInButton = document.getElementById('sign-in-button');
const errorAlert = document.getElementById('error-alert');
const errorMessage = document.getElementById('error-message');
const successAlert = document.getElementById('success-alert');
const infoAlert = document.getElementById('info-alert');
const usernameTooltip = document.getElementById('username-tooltip');
const passwordTooltip = document.getElementById('password-tooltip');
const emailTooltip = document.getElementById('email-tooltip');
const passwordToggle = document.querySelector('.password-toggle');
const showPasswordIcon = document.querySelector('.show-password');
const hidePasswordIcon = document.querySelector('.hide-password');
const forgotPasswordButton = document.querySelector('.forgot-password');
const returnToLoginButton = document.querySelector('.return-to-login');
    const testCaseButtons = document.querySelectorAll('.test-case-button');
    const description = document.getElementById('case-description');

    // Current test case tracking
    let currentTestCase = '1';
    
    // Check if URL has a case hash and load that case
    function loadCaseFromHash() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#case=')) {
            const caseNumber = hash.replace('#case=', '');
            if (testCases[caseNumber]) {
                // Find the button with this case number
                const button = document.querySelector(`.test-case-button[data-case="${caseNumber}"]`);
                if (button) {
                    // Simulate a click on this button
                    button.click();
                    return true;
                }
            }
        }
        return false;
    }
    
    // Function to update the URL hash without triggering a page reload
    function updateUrlHash(caseNumber) {
        history.replaceState(null, null, `#case=${caseNumber}`);
    }

// Helper Functions
function showError(message) {
    successAlert.style.display = 'none';
    infoAlert.style.display = 'none';
    errorMessage.textContent = message;
    errorAlert.style.display = 'block';
}

function showSuccess() {
    errorAlert.style.display = 'none';
    infoAlert.style.display = 'none';
    successAlert.style.display = 'block';
}

function showInfo(message) {
    errorAlert.style.display = 'none';
    successAlert.style.display = 'none';
    document.getElementById('info-message').textContent = message;
    infoAlert.style.display = 'block';
}

function hideAlerts() {
    errorAlert.style.display = 'none';
    successAlert.style.display = 'none';
    infoAlert.style.display = 'none';
}

function showTooltip(element, message) {
    element.textContent = message;
    element.classList.add('visible');
}

function hideTooltip(element) {
    element.classList.remove('visible');
}

    function showLoginCard() {
        forgotPasswordCard.style.display = 'none';
        loginCard.style.display = 'block';
        usernameInput.focus();
    }

    function showForgotPasswordCard() {
        loginCard.style.display = 'none';
        forgotPasswordCard.style.display = 'block';
        resetEmailInput.focus();
    }

    // Helper functions for validation - only used with Enter key
    function validateEmptyUsername() {
    if (!usernameInput.value) {
        usernameInput.parentElement.classList.add('error');
            showTooltip(usernameTooltip, 'Username/email field is blank.');
        }
    }

    function validateEmptyPassword() {
    if (!passwordInput.value) {
        passwordInput.parentElement.parentElement.classList.add('error');
            showTooltip(passwordTooltip, 'Password field is blank.');
        }
    }

    // Function to copy the current case link to clipboard
    function copyCurrentCaseLink() {
        const url = `${window.location.origin}${window.location.pathname}#case=${currentTestCase}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                // Show temporary success message
                const button = document.querySelector(`.case-copy-button[data-case="${currentTestCase}"]`);
                if (button) {
                    const originalText = button.textContent;
                    button.textContent = "Copied!";
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 1500);
                }
            })
            .catch(err => {
                console.error('Failed to copy link: ', err);
            });
    }

    function configureTestCase(caseNumber) {
        // Disable all interactive elements by default
        usernameInput.disabled = true;
        passwordInput.disabled = true;
        resetEmailInput.disabled = true;
        signInButton.disabled = true;
        forgotPasswordButton.disabled = true;
        returnToLoginButton.disabled = true;
        const submitResetButton = document.getElementById('submit-reset');
        if (submitResetButton) {
            submitResetButton.disabled = true;
        }
        passwordToggle.style.pointerEvents = 'none';
        
        // Remove validation event listeners
        usernameInput.removeEventListener('blur', validateEmptyUsername);
        passwordInput.removeEventListener('blur', validateEmptyPassword);
        usernameInput.removeEventListener('focus', () => hideTooltip(usernameTooltip));
        passwordInput.removeEventListener('focus', () => hideTooltip(passwordTooltip));
        
        // Master prototype case - enable everything except sign in button (which requires input)
        if (caseNumber === '0') {
            usernameInput.disabled = false;
            passwordInput.disabled = false;
            // Sign in button remains disabled until both fields have input
            forgotPasswordButton.disabled = false;
            passwordToggle.style.pointerEvents = 'auto';
            if (submitResetButton) {
                submitResetButton.disabled = false;
            }
            
            // In master prototype, only focus events for hiding tooltips
            usernameInput.addEventListener('focus', () => hideTooltip(usernameTooltip));
            passwordInput.addEventListener('focus', () => hideTooltip(passwordTooltip));
            
            return;
        }

        // Common configuration for input field test cases
        if (['12', '13', '14', '15', '16'].includes(caseNumber)) {
            usernameInput.disabled = false;
            passwordInput.disabled = false;
            // Sign in button remains disabled until both fields have input
            passwordToggle.style.pointerEvents = 'auto';
        }

        // Enable specific interactions based on test case
        switch (caseNumber) {
            case '1': // Valid Login
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                // Sign in button remains disabled until both fields have input
                passwordToggle.style.pointerEvents = 'auto';
                break;

            case '2': // Invalid Username
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                // Sign in button remains disabled until both fields have input
                break;

            case '3': // Invalid Password
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                // Sign in button remains disabled until both fields have input
                break;

            case '4': // Empty Fields Validation
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                break;

            case '5': // Focus State Behavior
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                break;

            case '6': // Password Visibility Toggle
                passwordInput.disabled = false;
                passwordToggle.style.pointerEvents = 'auto';
                break;

            case '7': // Keyboard Navigation
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                // Sign in button remains disabled until both fields have input
                forgotPasswordButton.disabled = false;
                passwordToggle.style.pointerEvents = 'auto';
                break;

            case '8': // Forgot Password Flow
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                forgotPasswordButton.disabled = false;
                resetEmailInput.disabled = false;
                if (submitResetButton) {
                    submitResetButton.disabled = false;
                }
                break;

            case '9': // Return to Login
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                forgotPasswordButton.disabled = false;
                returnToLoginButton.disabled = false;
                resetEmailInput.disabled = false;
                break;

            case '10': // Alert Behavior
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                // Sign in button is handled differently for this case
                passwordToggle.style.pointerEvents = 'auto';
                
                // Special handling for case 10 - enable button based on any input
                usernameInput.addEventListener('input', updateSignInButtonForCase10);
                passwordInput.addEventListener('input', updateSignInButtonForCase10);
                
                // Initialize button state
                updateSignInButtonForCase10();
                break;

            case '12': // Input Length Limits
                usernameInput.disabled = false;
                break;
                
            case '13': // Special Character Handling
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                break;
                
            case '14': // Copy & Paste Behavior
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                break;
                
            case '15': // Auto-fill Integration
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                break;
                
            case '16': // Input Field Behavior
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                break;
                
            case '17': // Session Timeout A
                // Show session timeout message
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                // Sign in button remains disabled until both fields have input
                showError('Signed out due to inactivity');
                break;
                
            case '18': // Session Timeout B
                // Show session timeout 2 message
                usernameInput.disabled = false;
                passwordInput.disabled = false;
                // Sign in button remains disabled until both fields have input
                showError('Sign-in timed out. Please start over');
                break;
        }

        // Add specific handlers for certain test cases
        if (caseNumber === '4') {
            // Add tooltip behavior for Empty Fields Validation - only focus events
            usernameInput.addEventListener('focus', () => hideTooltip(usernameTooltip));
            passwordInput.addEventListener('focus', () => hideTooltip(passwordTooltip));
        } else {
            // Remove event listeners for other cases
            usernameInput.removeEventListener('blur', validateEmptyUsername);
            passwordInput.removeEventListener('blur', validateEmptyPassword);
        }

        // Make password toggle clickable in more cases
        if (['0', '1', '2', '3', '6', '7', '8', '9', '12', '13', '14', '15', '16'].includes(caseNumber)) {
            passwordToggle.style.pointerEvents = 'auto';
        }
    }

    // Add copy link buttons to each test case
    testCaseButtons.forEach(button => {
        const caseNumber = button.getAttribute('data-case');
        const listItem = button.parentElement;
        
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'case-copy-button';
        copyButton.setAttribute('data-case', caseNumber);
        copyButton.textContent = '🔗';
        copyButton.title = 'Copy link to this test case';
        
        // Add click event listener to copy the link
        copyButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the test case button click
            const url = `${window.location.origin}${window.location.pathname}#case=${caseNumber}`;
            navigator.clipboard.writeText(url)
                .then(() => {
                    // Show temporary success message
                    const originalText = copyButton.textContent;
                    copyButton.textContent = "✓";
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy link: ', err);
                });
        });
        
        // Add the copy button to the list item
        listItem.appendChild(copyButton);
    });

    // Event listeners for each test case button
    testCaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            testCaseButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            // Update current test case and description
            currentTestCase = button.getAttribute('data-case');
            description.textContent = testCases[currentTestCase];
            
            // Update URL hash
            updateUrlHash(currentTestCase);

            // Reset form state
            if (currentTestCase === '9') {
                // For case 9, clear fields when switching to forgot password
                forgotPasswordButton.addEventListener('click', () => {
                    usernameInput.value = '';
                    passwordInput.value = '';
                    signInButton.disabled = true;
                    signInButton.classList.remove('active');
                }, { once: true });
            } else {
                // For other cases, clear immediately
                usernameInput.value = '';
                passwordInput.value = '';
                resetEmailInput.value = '';
                signInButton.disabled = true;
                signInButton.classList.remove('active');
            }
            
            // Reset error states
    usernameInput.parentElement.classList.remove('error');
    passwordInput.parentElement.parentElement.classList.remove('error');
            resetEmailInput.parentElement.classList.remove('error');
    hideTooltip(usernameTooltip);
    hideTooltip(passwordTooltip);
            hideTooltip(emailTooltip);

            // Hide all alerts
    hideAlerts();
            
            // Reset password visibility
            passwordInput.type = 'password';
            showPasswordIcon.style.display = 'block';
            hidePasswordIcon.style.display = 'none';
            passwordToggle.classList.remove('visible');
            
            // Show login card and hide forgot password card
            showLoginCard();

            // Configure available interactions for this test case
            configureTestCase(currentTestCase);
            
            // Special case for Session Timeout
            if (currentTestCase === '17') {
                showError('Signed out due to inactivity');
            }
            
            // Special case for Session Timeout 2
            if (currentTestCase === '18') {
                showError('Sign-in timed out. Please start over');
            }
        });
    });

    // Listen for hash changes
    window.addEventListener('hashchange', loadCaseFromHash);
    
    // Try to load a case from the URL hash when the page first loads
    if (!loadCaseFromHash()) {
        // If no case in hash or invalid case, default to case 1
        const defaultButton = document.querySelector('.test-case-button[data-case="1"]');
        if (defaultButton) {
            defaultButton.click();
        }
    }

    // Enable submit button for forgot password
    resetEmailInput.addEventListener('input', () => {
        const submitButton = document.getElementById('submit-reset');
        if (submitButton && (['0', '8', '9'].includes(currentTestCase))) {
            submitButton.disabled = !resetEmailInput.value;
            submitButton.classList.toggle('active', resetEmailInput.value.length > 0);
        }
    });

    // Update reset form submission for seamless transition
resetForm.addEventListener('submit', (e) => {
    e.preventDefault();
        const submitButton = document.getElementById('submit-reset');
        
        if (!resetEmailInput.value || !(['0', '8', '9'].includes(currentTestCase))) {
        return;
    }
        
        // Store email value to preserve it
        const emailValue = resetEmailInput.value;
        
        // Show login card immediately
    showLoginCard();
        
        // Preserve email in username field, clear password
        usernameInput.value = emailValue;
        passwordInput.value = '';
        
        // Reset password visibility state
        passwordInput.type = 'password';
        showPasswordIcon.style.display = 'block';
        hidePasswordIcon.style.display = 'none';
        passwordToggle.classList.remove('visible');
        
        // Show success message after returning to login (appears more seamless)
        showInfo('Check your inbox for a reset link.');
    });

    // Update forgot password button to handle the flow
    forgotPasswordButton.addEventListener('click', () => {
        if (['0', '8', '9'].includes(currentTestCase)) {
            // Store username value before switching
            const usernameValue = usernameInput.value;
            showForgotPasswordCard();
            // Pre-fill email with username if it exists
            resetEmailInput.value = usernameValue;
            // Clear password field
            passwordInput.value = '';
            passwordToggle.classList.remove('visible');
            
            // Enable and update submit button state
            const submitButton = document.getElementById('submit-reset');
            if (submitButton) {
                submitButton.disabled = !resetEmailInput.value;
                submitButton.classList.toggle('active', resetEmailInput.value.length > 0);
            }
            
            // Ensure the reset email input is focused for better UX
            resetEmailInput.focus();
        }
});

// Input validation and button state
    usernameInput.addEventListener('input', () => {
        const hasUsername = usernameInput.value.length > 0;
        const hasPassword = passwordInput.value.length > 0;
        
        // Remove error state and tooltip as soon as typing begins
        if (hasUsername) {
            usernameInput.parentElement.classList.remove('error');
            hideTooltip(usernameTooltip);
        }
        
        // Update button state for all cases - always require both fields to have content
        signInButton.disabled = !(hasUsername && hasPassword);
        signInButton.classList.toggle('active', hasUsername && hasPassword);
    });
    
    passwordInput.addEventListener('input', () => {
        const hasUsername = usernameInput.value.length > 0;
        const hasPassword = passwordInput.value.length > 0;
        
        // Remove error state and tooltip as soon as typing begins
        if (hasPassword) {
            passwordInput.parentElement.parentElement.classList.remove('error');
            hideTooltip(passwordTooltip);
        }
        
        // Update button state for all cases - always require both fields to have content
        signInButton.disabled = !(hasUsername && hasPassword);
        signInButton.classList.toggle('active', hasUsername && hasPassword);
        
        // Show/hide password toggle based on input content
        passwordToggle.classList.toggle('visible', passwordInput.value.length > 0);
        if (passwordInput.value.length === 0) {
            // Reset to password hidden state when field is empty
            passwordInput.type = 'password';
            showPasswordIcon.style.display = 'block';
            hidePasswordIcon.style.display = 'none';
        }
    });

    // Add input event handler for reset email input
    resetEmailInput.addEventListener('input', () => {
        // Remove error state and tooltip as soon as typing begins
        if (resetEmailInput.value.length > 0) {
            resetEmailInput.parentElement.classList.remove('error');
            hideTooltip(emailTooltip);
        }
        
        const submitButton = document.getElementById('submit-reset');
        if (submitButton && (['0', '8', '9'].includes(currentTestCase))) {
            submitButton.disabled = !resetEmailInput.value;
            submitButton.classList.toggle('active', resetEmailInput.value.length > 0);
        }
    });

    // Set correct tab order
    usernameInput.setAttribute('tabindex', '1');
    passwordInput.setAttribute('tabindex', '2');
    passwordToggle.setAttribute('tabindex', '3');
    signInButton.setAttribute('tabindex', '4');
    forgotPasswordButton.setAttribute('tabindex', '5');

    // Password visibility toggle - Ensure password toggle has a background fill
    passwordToggle.addEventListener('click', () => {
        // Always allow toggle regardless of case
        if (passwordInput.value.length > 0) {  // Only toggle if there's text
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            showPasswordIcon.style.display = type === 'password' ? 'block' : 'none';
            hidePasswordIcon.style.display = type === 'password' ? 'none' : 'block';
        }
    });

    // Add style to password toggle to ensure it has background
    const style = document.createElement('style');
    style.textContent = `
        .password-toggle {
            background-color: white;
            position: absolute;
            right: 10px;
        }
        .password-input-container {
            position: relative;
        }
        .password-input-container input,
        .password-input-wrapper input {
            padding-right: 42px; /* Increased padding to ensure text doesn't go under the toggle */
        }
        /* Extra specific selector to ensure it overrides any other styles */
        #password {
            padding-right: 42px;
        }
    `;
    document.head.appendChild(style);

    // Handle keyboard navigation for all relevant cases
    document.addEventListener('keydown', (e) => {
        // Only handle Enter key for showing tooltips
        if (e.key === 'Enter' && ['0', '4'].includes(currentTestCase)) {
            const activeElement = document.activeElement;

            if (activeElement === usernameInput) {
                if (!usernameInput.value) {
                    usernameInput.parentElement.classList.add('error');
                    showTooltip(usernameTooltip, 'Username/email field is blank.');
                }
                
                // For Enter, prevent form submission and move to password
                e.preventDefault();
                passwordInput.focus();
            } else if (activeElement === passwordInput) {
                if (!passwordInput.value) {
                    passwordInput.parentElement.parentElement.classList.add('error');
                    showTooltip(passwordTooltip, 'Password field is blank.');
                }
                
                // Prevent default behavior if the field is empty
                if (!passwordInput.value) {
                    e.preventDefault();
                }
            }
        }
    });

    // Navigation
    returnToLoginButton.addEventListener('click', () => {
        if (['0', '8', '9'].includes(currentTestCase)) {
            showLoginCard();
        }
    });

    // Update login form submission to handle test cases
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (currentTestCase === '10') {
            // Special handling for Alert Behavior case
            // Alternate between different error messages
            if (!username || username !== VALID_CREDENTIALS.username) {
                showError('Username or email does not exist.');
            } else if (!password || password !== VALID_CREDENTIALS.password) {
                showError('Your password does not match your username or email.');
            } else {
                showError('Account temporarily locked. Please try again later.');
            }
            return;
        }
        
        if (!username || !password) {
            return;
        }
        
        // Handle different test cases
        if ((currentTestCase === '0' || currentTestCase === '1') && 
            username === VALID_CREDENTIALS.username && 
            password === VALID_CREDENTIALS.password) {
            // Valid login cases
            signInButton.disabled = true;
            signInButton.textContent = 'Signing in...';
            showSuccess();
            setTimeout(() => {
                signInButton.disabled = false;
                signInButton.textContent = 'Sign in';
            }, 3000);
        } else if ((currentTestCase === '0' && username === VALID_CREDENTIALS.username && 
                  password !== VALID_CREDENTIALS.password) || 
                  currentTestCase === '3') {
            // Invalid password cases - giving priority to password error for master prototype
            passwordInput.value = '';
            passwordToggle.classList.remove('visible');
            showError('Your password does not match your username or email.');
        } else if (['0', '2', '13', '14', '15', '16'].includes(currentTestCase) || 
                  username !== VALID_CREDENTIALS.username) {
            // Invalid username cases
            passwordInput.value = '';
            passwordToggle.classList.remove('visible');
            showError('Username or email does not exist.');
        }
    });

    // Initialize with test case 1 (first test case)
    description.textContent = testCases['1'];
    configureTestCase('1');

    // Initialize password toggle state
    showPasswordIcon.style.display = 'block';
    hidePasswordIcon.style.display = 'none';
    passwordToggle.classList.toggle('visible', passwordInput.value.length > 0);

    // Helper function for case 10
    function updateSignInButtonForCase10() {
        if (currentTestCase === '10') {
            const hasUsername = usernameInput.value.length > 0;
            const hasPassword = passwordInput.value.length > 0;
            signInButton.disabled = !(hasUsername && hasPassword);
            signInButton.classList.toggle('active', hasUsername && hasPassword);
        }
    }
}); 