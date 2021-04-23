/*
	QR code processing code from https://davidshimjs.github.io/qrcodejs/.
	Icons from flaticon.	
	Thank you!
*/

/* Creates the QR code itself */
function createQR(fromSearchBar, URL) {
	let data;

	if(fromSearchBar){
		data = window.location.href;
	}	
	else {
		data = URL;
	}

	if(!qrcode){
		qrcode = new QRCode('qr', {width: 250, height: 250}); // This size works well even with very populated QR codes
	}

	qrcode.clear();

	if(data.length < 7089){
		qrcode.makeCode(data);
	}
}

/* Styles the Wrapper */
function styleWrapper(){
	const wrapper = document.getElementById('wrapper');
	wrapper.style.position = 'fixed';
	wrapper.style.right = '0';
	wrapper.style.top = '0';
	wrapper.style.backgroundColor = 'white';
	wrapper.style.zIndex = '10000000';
}

/* Makes the QR small */
function makeSmall(){
	const qr = get_qr();
	const qrImage = get_qrImage();
	qr.style.padding = '1px';
	qrImage.style.width = '12px';
	qrImage.style.height = '12px';
	QR_TOGGLE_STATE = false;
	controls_selected.style.display = 'none';
}

/* Makes the QR big */
function makeBig(){
	const qr = get_qr();
	const qrImage = get_qrImage();
	qr.style.padding = '7px';
	qrImage.style.width = '200px';
	qrImage.style.height = '200px';
	QR_TOGGLE_STATE = true;
	controls_selected.style.display = 'block';
}

/* Makes QR small when it's big and viceversa */
function toggleQR(){
	if (!QR_TOGGLE_STATE){
		createQR(true, null);
		makeBig();
	}
	else {
		makeSmall();
	}
}

/* Returns an instance of the QR container */
function get_qr(){
	if(qr === null){
		qr = document.getElementById('qr');
	}

	return qr;
}

/* Returns an instance of the QR code img tag itself */
function get_qrImage(){
	if(qrImage === null){
		qrImage = qr.querySelector('img');
	}

	return qrImage;
}

/* Adds all the used event listeners */ 
function addEventListenersQR(){
	const qr = get_qr();
	qr.addEventListener('click', toggleQR);
	controls_selected.addEventListener('click', setQRFromSelectedText);
}

/* Gets selected/highlighted text */
function getSelectedText() {
    let text = '';

    if (window.getSelection) { 
    	console.log('window.getSelection');
        text = window.getSelection().toString(); 
    } 
    else if (document.getSelection) { 
    	console.log('document.getSelection');
        text = document.getSelection().toString(); 
    } 
    else if (document.selection) { 
    	console.log('document.selection');
        text = document.selection.createRange().text.toString(); 
    } 

    return text.trim() !== '' ? text.trim() : null;
}

/* Takes selected text and represents it in QR */
function setQRFromSelectedText(){
	const text = getSelectedText();
	console.log('SELECTED TEXT: ', text);
	if(!text){
		alert('Cannot select that text...');
		return;
	}
	else if(text.length > 7089){
		alert('Selected content is too big ( > 7089 chars )...');
		return;
	}
	else {
		createQR(false, text);
	}
}

/* Creates and displays QR */
function init(){
	qr = document.getElementById('qr');
	qr.style.display = 'none';
	createQR(true, null);
	makeSmall();
	styleWrapper();
	addEventListenersQR();
	setTimeout(() => qr.style.display = 'inline-block', 100); // To avoid blink when QR is created for the first time
}




/**** HERE WE GO ****/
let QR_TOGGLE_STATE = false;
const body = document.getElementsByTagName('body')[0];
let qrcode = null;
let qr = null;
let qrImage = null;

// Append to body the div where QR code is going to be and hide it, create the QR and then display it
// Wrapper
const wrapper = document.createElement('div');
wrapper.setAttribute('id', 'wrapper');
wrapper.style.setProperty('border-radius', '3px', 'important');
wrapper.style.setProperty('width', 'auto', 'important');
wrapper.style.setProperty('font', 'initial', 'important');
wrapper.style.setProperty('font-family', 'Arial,x-locale-body,sans-serif', 'important');
wrapper.style.setProperty('font-style', 'normal', 'important');
wrapper.style.setProperty('font-size', '12px', 'important');
body.appendChild(wrapper);
// QR
const QRDiv = document.createElement('div');
QRDiv.setAttribute('id', 'qr');
wrapper.appendChild(QRDiv);
// Controls container
const controls = document.createElement('div');
controls.setAttribute('id', 'controls');
controls.style.setProperty('text-align', 'center', 'important');
wrapper.appendChild(controls);
// Take input from selected text button
const controls_selected = document.createElement('button');
controls_selected.setAttribute('id', 'controls_selected');
// Set visuals on QR panel, including button
controls_selected.innerHTML = 'SELECTED TEXT';
controls_selected.style.display = 'none';
controls_selected.style.setProperty('margin', '0 auto', 'important');
controls_selected.style.setProperty('height', '20px', 'important');
controls_selected.style.setProperty('color', '#fff', 'important');
controls_selected.style.setProperty('background-color', '#000', 'important');
controls_selected.style.setProperty('margin-bottom', '10px', 'important');
controls_selected.style.setProperty('border-radius', '3px', 'important');
controls_selected.style.setProperty('font-size', '12px', 'important');
controls_selected.style.setProperty('padding-left', '5px', 'important');
controls_selected.style.setProperty('padding-right', '5px', 'important');
controls_selected.style.setProperty('padding-top', '2px', 'important');
controls_selected.style.setProperty('font-weight', 'normal', 'important');
controls_selected.style.setProperty('font-family', 'Verdana', 'important');
controls_selected.style.setProperty('font-size', '12px', 'important');
controls_selected.style.setProperty('padding-bottom', '2px', 'important');
controls_selected.style.setProperty('border', 'none', 'important');
controls.appendChild(controls_selected);

init();