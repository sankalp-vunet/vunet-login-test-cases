// Valid credentials for testing
const VALID_CREDENTIALS = {
    username: "vunet",
    password: "asdfg@123"
};

// Test case descriptions
const testCases = {
    1: "Test Case 1: Valid Login\n\nSteps:\n1. Enter username: 'vunet'\n2. Enter password: 'asdfg@123'\n3. Click 'Sign in' button\n\nExpected Result:\n- Success message appears\n- Button changes to 'Signing in...' state",

    2: "Test Case 2: Invalid Username\n\nSteps:\n1. Enter any username except 'vunet' (e.g., 'wronguser')\n2. Enter any password\n3. Click 'Sign in' button\n\nExpected Result:\n- Error message: 'Username or email does not exist'",

    3: "Test Case 3: Invalid Password\n\nSteps:\n1. Enter username: 'vunet'\n2. Enter incorrect password\n3. Click 'Sign in' button\n\nExpected Result:\n- Error message: 'Your password does not match your username or email'",

    4: "Test Case 4: Empty Fields Validation\n\nSteps:\n1. Leave both fields empty\n2. Click in username field, then tab out\n3. Click in password field, then tab out\n\nExpected Result:\n- Red border appears around empty fields\n- Tooltips appear showing 'field is blank' messages\n- Sign in button remains disabled",

    5: "Test Case 5: Focus Loss Behavior\n\nSteps:\n1. Click in username field\n2. Type partial text\n3. Click outside the login card\n4. Repeat for password field\n\nExpected Result:\n- Any visible tooltips should disappear\n- Field borders return to normal state\n- Form state is preserved",

    6: "Test Case 6: Password Visibility Toggle\n\nSteps:\n1. Enter some text in password field\n2. Click the eye icon to show password\n3. Click again to hide password\n4. Clear the field\n\nExpected Result:\n- Eye icon appears only when field has text\n- Password toggles between visible and hidden\n- Eye icon disappears when field is empty",

    7: "Test Case 7: Keyboard Navigation\n\nSteps:\n1. Press Tab to move through fields\n2. Use Enter key in fields\n3. Use Shift+Tab to move backwards\n\nExpected Result:\n- Tab order: Username → Password → Password visibility toggle → Sign in button → Forget password\n- Enter in fields triggers form submission\n- Focus indicators visible on all interactive elements",

    8: "Test Case 8: Forgot Password Flow\n\nSteps:\n1. Click 'Forgot password?' link\n2. Observe the new card\n3. Enter any text in email field\n4. Click 'Return to login'\n\nExpected Result:\n- Switches to password reset card\n- Submit button enables with any input\n- Returns to login card preserving previous input",

    9: "Test Case 9: Form State Management\n\nSteps:\n1. Enter partial credentials\n2. Switch to forgot password\n3. Return to login\n\nExpected Result:\n- Form fields should be cleared\n- No error states persist\n- Sign in button returns to default state",

    10: "Test Case 10: Alert Behavior\n\nSteps:\n1. Trigger an error (e.g., wrong password)\n2. Quickly trigger another error\n\nExpected Result:\n- New alerts replace existing ones\n- Alerts remain visible until next action\n- Alerts don't stack or overlap",

    11: "Test Case 11: Field Validation Timing\n\nSteps:\n1. Type in username field\n2. Delete text\n3. Tab out\n4. Click in and out\n\nExpected Result:\n- Validation occurs on blur (focus loss)\n- Validation triggers on tab\n- Error states clear on focus"
};

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

// Set correct tab order
usernameInput.setAttribute('tabindex', '1');
passwordInput.setAttribute('tabindex', '2');
passwordToggle.setAttribute('tabindex', '3');
signInButton.setAttribute('tabindex', '4');
forgotPasswordButton.setAttribute('tabindex', '5');

// Store form state
let lastUsernameValue = '';

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

function validateForm() {
    let isValid = true;
    hideAlerts();
    
    // Reset input states
    usernameInput.parentElement.classList.remove('error');
    passwordInput.parentElement.parentElement.classList.remove('error');
    hideTooltip(usernameTooltip);
    hideTooltip(passwordTooltip);

    if (!usernameInput.value) {
        usernameInput.parentElement.classList.add('error');
        isValid = false;
    }

    if (!passwordInput.value) {
        passwordInput.parentElement.parentElement.classList.add('error');
        isValid = false;
    }

    return isValid;
}

function validateResetForm() {
    let isValid = true;
    hideAlerts();
    
    resetEmailInput.parentElement.classList.remove('error');
    hideTooltip(emailTooltip);

    if (!resetEmailInput.value) {
        resetEmailInput.parentElement.classList.add('error');
        showTooltip(emailTooltip, 'Email field is blank.');
        isValid = false;
    }

    return isValid;
}

function updateSignInButton() {
    const hasUsername = usernameInput.value.length >= 2;
    const hasPassword = passwordInput.value.length >= 2;
    signInButton.disabled = !(hasUsername && hasPassword);
    signInButton.classList.toggle('active', hasUsername && hasPassword);
}

function togglePasswordVisibility() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    showPasswordIcon.style.display = type === 'password' ? 'block' : 'none';
    hidePasswordIcon.style.display = type === 'password' ? 'none' : 'block';
}

function updatePasswordToggleVisibility() {
    passwordToggle.classList.toggle('visible', passwordInput.value.length > 0);
}

function showLoginCard() {
    forgotPasswordCard.style.display = 'none';
    loginCard.style.display = 'block';
    // Don't clear the username value anymore
    usernameInput.focus();
    // Clear any error states
    usernameInput.parentElement.classList.remove('error');
    passwordInput.parentElement.parentElement.classList.remove('error');
    hideTooltip(usernameTooltip);
    hideTooltip(passwordTooltip);
}

function showForgotPasswordCard() {
    loginCard.style.display = 'none';
    forgotPasswordCard.style.display = 'block';
    hideAlerts();
    // Store username value before switching
    lastUsernameValue = usernameInput.value;
    // Pre-fill email with username if it exists
    resetEmailInput.value = lastUsernameValue;
    resetEmailInput.focus();
}

// Event Listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Only proceed if both fields have content
    if (!username || !password) {
        return;
    }

    if (username === 'vunet' && password === 'asdfg@123') {
        signInButton.disabled = true;
        signInButton.textContent = 'Signing in...';
        showAlert('success', 'Logging in successfully...');
        setTimeout(() => {
            signInButton.disabled = false;
            signInButton.textContent = 'Sign in';
        }, 3000);
    } else if (username !== 'vunet') {
        showAlert('error', 'Username or email does not exist.');
    } else {
        showAlert('error', 'Your password does not match your username or email.');
    }
});

resetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!resetEmailInput.value) {
        showAlert('error', 'Email field is blank.');
        return;
    }
    showLoginCard();
    showAlert('info', 'Check your inbox for a reset link.');
});

// Input validation and button state
usernameInput.addEventListener('input', updateSignInButton);
passwordInput.addEventListener('input', () => {
    updateSignInButton();
    // Clear error state when typing
    passwordInput.parentElement.parentElement.classList.remove('error');
    hideTooltip(passwordTooltip);
});

// Hide tooltips on focus
usernameInput.addEventListener('focus', () => hideTooltip(usernameTooltip));
passwordInput.addEventListener('focus', () => hideTooltip(passwordTooltip));
resetEmailInput.addEventListener('focus', () => hideTooltip(emailTooltip));

// Password visibility toggle
if (passwordToggle) {
    let isPasswordVisible = false;
    
    passwordInput.addEventListener('input', () => {
        passwordToggle.classList.toggle('visible', passwordInput.value.length > 0);
    });

    passwordToggle.addEventListener('click', () => {
        isPasswordVisible = !isPasswordVisible;
        passwordInput.type = isPasswordVisible ? 'text' : 'password';
        showPasswordIcon.style.display = isPasswordVisible ? 'none' : 'block';
        hidePasswordIcon.style.display = isPasswordVisible ? 'block' : 'none';
    });

    // Initialize the toggle state
    showPasswordIcon.style.display = 'block';
    hidePasswordIcon.style.display = 'none';
}

// Form submission handlers
forgotPasswordButton.addEventListener('click', showForgotPasswordCard);
returnToLoginButton.addEventListener('click', showLoginCard);

// Enable submit button for forgot password
resetEmailInput.addEventListener('input', () => {
    const submitButton = document.getElementById('submit-reset');
    submitButton.disabled = !resetEmailInput.value;
    submitButton.classList.toggle('active', resetEmailInput.value);
});

// Handle Enter key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        
        const activeElement = document.activeElement;
        
        // Handle password toggle button
        if (activeElement === passwordToggle) {
            passwordToggle.click();
            return;
        }
        
        // Show tooltips only for the active input field when Enter is pressed
        if (activeElement === usernameInput && !usernameInput.value) {
            usernameInput.parentElement.classList.add('error');
            showTooltip(usernameTooltip, 'Username/email field is blank.');
            return;
        }
        if (activeElement === passwordInput && !passwordInput.value) {
            passwordInput.parentElement.parentElement.classList.add('error');
            showTooltip(passwordTooltip, 'Password field is blank');
            return;
        }
        if (activeElement === resetEmailInput && !resetEmailInput.value) {
            resetEmailInput.parentElement.classList.add('error');
            showTooltip(emailTooltip, 'Email field is blank.');
            return;
        }
        
        if (forgotPasswordCard.style.display === 'none') {
            loginForm.requestSubmit();
        } else {
            resetForm.requestSubmit();
        }
    }
});

// Initialize test cases functionality
document.addEventListener('DOMContentLoaded', () => {
    const testCasesList = document.querySelector('.test-cases-list');
    if (testCasesList) {
        testCasesList.innerHTML = Object.keys(testCases).map(caseNum => `
            <li><button class="test-case-button${caseNum === '1' ? ' active' : ''}" data-case="${caseNum}">Case ${caseNum}</button></li>
        `).join('');
    }

    const buttons = document.querySelectorAll('.test-case-button');
    const description = document.getElementById('case-description');

    // Set initial description
    description.textContent = testCases[1];

    // Handle test case selection
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            // Update description
            const caseNumber = button.getAttribute('data-case');
            description.textContent = testCases[caseNumber];

            // Reset form state
            usernameInput.value = '';
            passwordInput.value = '';
            resetEmailInput.value = '';
            signInButton.disabled = true;
            signInButton.classList.remove('active');
            
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
        });
    });
});

// Show alert message
function showAlert(type, message) {
    const alerts = {
        error: document.getElementById('error-alert'),
        success: document.getElementById('success-alert'),
        info: document.getElementById('info-alert')
    };

    // Hide all alerts
    Object.values(alerts).forEach(alert => {
        if (alert) alert.style.display = 'none';
    });

    // Show the specified alert
    const alert = alerts[type];
    if (alert) {
        const messageElement = alert.querySelector(`#${type}-message`);
        if (messageElement) {
            messageElement.innerHTML = message;
            alert.style.display = 'flex';
        }
    }
} 