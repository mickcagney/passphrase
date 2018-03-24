
function checkstr(tintwho,passtips,levels) {

	document.getElementById(tintwho).style.backgroundColor = "#FF0010";
	document.getElementById(passtips).style.fontSize="small";

	var reqlevel = Math.abs(levels)%10;				// required characters is reqlevel
	var level = ~~(levels / 10);					// extract level 1 - 4
	var validpass = false;

	var reqval = [0,0,0,0];					// reset flags for required password characteristics 

	var passbg = 16711696;  					// #F0010 start at red
	var increment = 1109760;					// #10EF10 increment for level 4 

	if (level==3) {
		passbg = 16712976;  					// #FF0510
		increment = 1632000;					// #18E700
		}
		else if(level==2) {
			passbg = 16713488;  				// #FF0710
			increment = 2023680;				// #1EE100	
			}
			else if(level==1) { increment = 3329280;  }  	// #32CD00 1 & 4 use same passbg to start
	
	var x = document.getElementById(tintwho).value;

	// test1 checks length of password

	var test1 = x.length;
	if (level==4 && test1>11)  {  passbg = passbg - (increment*5); reqval[0]=1; console.log(">11"); }
		else if(level>1 && test1>9){  passbg = passbg - (increment*4); reqval[0]=1; console.log(">9"); }
			else if(level>1 && test1>7) {  passbg = passbg - (increment*3); reqval[0]=1; console.log(">7"); }
				else if (test1>5) {     passbg = passbg - (increment*2); reqval[0]=1; console.log(">5"); }
					else if (test1>3) {   passbg = passbg - increment; console.log(">3"); }

	// test 2 looks for upper and lower case letters
	
	var capsstr = x.replace(/[^A-Z]/g, '');
	var lowerstr = x.replace(/[^a-z]/g, '');	
	if(capsstr.length>0 && lowerstr.length>0){ passbg = passbg - increment;  reqval[1]=1; console.log("UP&Down"); }
		

	//test 3 looks for numbers

	str = x.replace( /[^+-\d.]/g, '');	
	if(level==4 && str.length>2) { passbg = passbg - (increment*3); reqval[2]=1; console.log("3 numbers"); }
		else if(level>1 && str.length>1) { passbg = passbg - (increment*2); reqval[2]=1; console.log("2 numbers"); }
			else if(str.length>0) {  passbg = passbg - increment;  reqval[2]=1; console.log("1 number"); }

	// test 4 checks if last character is a letter
	
	var lastchar = x.slice(-1);
	if (lastchar.match(/[A-Z,a-z]/g) && level>2) {  passbg = passbg - increment; console.log("last is a letter"); }


	// test 5 checks for special characters

	var spec = x.replace(/[a-z,0-9]/gi,'');
		if (spec.length>1 && level>2) { passbg = passbg - (increment*2); reqval[3]=1; console.log("2 special"); }
			else if (spec.length > 0) { passbg = passbg - increment;  reqval[3]=1; console.log("1 special"); }

	// test 6 checks if first character is a letter
	
	if(level==4) {
		var firstchar = x.charAt(0);
		if (firstchar.match(/[A-Z,a-z]/g)) {  passbg = passbg - increment; console.log("first is a letter"); }
		}


	// test 7 checks if special characters are 'holding hands' - we don't like that.
	
	if (level==4 && spec.length>1)  {
		
		var i=0;
		var first7flag;
		var spec2 = x.replace(/[a-z,0-9]/gi,'7');
		
		while (i<spec2.length) {
			if(spec2[i] !== '7') {  if (first7flag < (i-1)) {
							passbg = passbg - increment; 
							console.log("separate spec");
							i=spec2.length;
							}
 
     							else { first7flag = i;  i++;  }
						} 			// end of outer if succeed option
			else { i++; } 			// end of outer if fail option, just one line!

			}  			// end of while

		} 		// end of test 7


	// test 8 Oracle
	
	if(level==4 && passbg==1175056 && (x[0] !== 'K'))  {

		var Morpheus=0;
		var Nebuchadnezzar=0;
		var zion = new RegExp("Keanu");
		var redpill = zion.test(x);

		Nebuchadnezzar = x.lastIndexOf("Keanu");
		Nebuchadnezzar = Nebuchadnezzar + 4;

		if(redpill && (Nebuchadnezzar < (x.length-1))) {
			passbg = passbg - increment;
			Morpheus=true;
			}
		}
		



	// change passbg number back to hex 
 
	var hexcolor = passbg.toString(16);

	// prepend leading 0 if neccessary

    	var s = hexcolor+"";
    	while (s.length < 6) s = "0" + s;
	
	// prepend # sign
 
	var fullhexcolor = '#' + s;

	document.getElementById(tintwho).style.backgroundColor = fullhexcolor;


	// using the flags set above in reqval array now check which ones are actually required.
	var passstatus;

	if (reqlevel == 0) { if (test1>0) {passstatus=1; validpass = true;}}
		else if (reqlevel == 1 )  { passstatus = reqval[0];  if(passstatus<1) document.getElementById(passtips).innerHTML= ("Minimum 6 characters required.");}
			else if (reqlevel == 2 )  { passstatus = reqval[1]; if(passstatus<1) document.getElementById(passtips).innerHTML= ("Both uppercase and lowercase required.");}
				else if (reqlevel == 3 )  { passstatus = reqval[2]; if(passstatus<1) document.getElementById(passtips).innerHTML= ("Numerical character required.");}
					else if (reqlevel == 4 )  { passstatus = (reqval[0]+reqval[1])/2; if(passstatus<1) document.getElementById(passtips).innerHTML= ("Min 6 characters, both cases required.");}
						else if (reqlevel == 5 )  { passstatus = (reqval[0]+reqval[2])/2; if(passstatus<1) document.getElementById(passtips).innerHTML= ("Min 6 characters, with a numerical required.");}
							else if (reqlevel == 6 )  { passstatus = (reqval[0]+reqval[1]+reqval[2])/3; if(passstatus<1) document.getElementById(passtips).innerHTML= ("Min 6 characters, both cases and a numerical required.");}
								else if (reqlevel == 7 )  { passstatus = (reqval[0]+reqval[1]+reqval[3])/3; if(passstatus<1) document.getElementById(passtips).innerHTML= ("Min 6 characters, both cases and a special character required.");}
									else if (reqlevel == 8 )  { passstatus = (reqval[0]+reqval[2]+reqval[3])/3; if(passstatus<1) document.getElementById(passtips).innerHTML= ("Min 6 characters, a numerical and a special character required."); }
										else { passstatus = (reqval[0]+reqval[1]+reqval[2]+reqval[3])/4; if(passstatus<1) document.getElementById(passtips).innerHTML= ("Min 6 characters, both cases, a numerical and a special character required.");}



	if (passstatus>0.9) { validpass = true; console.log("Password is valid!"); document.getElementById(passtips).innerHTML= (""); }
	
	
	if (Morpheus) {document.getElementById(passtips).innerHTML= ("Neo has your back."); }
	
	return (validpass);

}
