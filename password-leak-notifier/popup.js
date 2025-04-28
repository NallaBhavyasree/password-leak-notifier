document.getElementById('checkBtn').addEventListener('click', async () => {
    const password = document.getElementById('passwordInput').value;
    if (!password) {
        alert('Please enter a password.');
        return;
    }

    const hash = await sha1(password);
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5).toUpperCase();

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await response.text();
    const lines = text.split('\n');

    let found = false;
    for (const line of lines) {
        if (line.startsWith(suffix)) {
            found = true;
            break;
        }
    }

    const resultDiv = document.getElementById('result');
    if (found) {
        resultDiv.textContent = "⚠️ Your password was found in a data breach!";
        chrome.runtime.sendMessage({notify: true});
    } else {
        resultDiv.textContent = "✅ Your password was NOT found.";
    }
});

// SHA-1 Hash function
async function sha1(str) {
    const buffer = new TextEncoder("utf-8").encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex.toUpperCase();
}
