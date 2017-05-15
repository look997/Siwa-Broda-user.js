// ==UserScript==
// @name		Siwa Broda
// @namespace		https://www.wykop.pl/ludzie/look997/
// @description		Siwa broda pod awatarem. Tym dłuższa, im dłuższy staż na wykopie.
// @author		look997
// @version		1.7 beta
// @grant		none
// @include		https://www.wykop.pl/*
// @date           2017-05-15
// @resource       metadata https://github.com/look997/Siwa-Broda/raw/master/Siwa_Broda_wykop_pl.user.js
// @downloadURL    https://github.com/look997/Siwa-Broda/raw/master/Siwa_Broda_wykop_pl.user.js
// @updateURL      https://github.com/look997/Siwa-Broda/raw/master/Siwa_Broda_wykop_pl.user.js
// @run-at 		document-end
// ==/UserScript==

"use strict";


function main() {
	"use strict";
	let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

	function appendChild (parentEl, stringEl) {
		const spanEl = document.createElement("span");
		spanEl.innerHTML = stringEl;
		parentEl.appendChild(spanEl.firstElementChild);
	}

	function b64toBlob(b64Data, contentType, sliceSize) {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		var byteCharacters = atob(b64Data);
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);

			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		var blob = new Blob(byteArrays, {type: contentType});
		return blob;
	}

	function cOURL (b64Data) {
		var blob = b64toBlob(b64Data, 'image/png');
		return URL.createObjectURL(blob, {autoRevoke: false});
	}

	function siwaBrodaFn () {
		let sbError = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA+CAYAAABp/UjKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwREiMYRaL08AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAjSURBVGje7cExAQAAAMKg9U9tCU+gAAAAAAAAAAAAAAAAngYwrgABCaOTZwAAAABJRU5ErkJggg==";

		let sb0 = "iVBORw0KGgoAAAANSUhEUgAAADIAAAA+CAYAAABp/UjKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwRDAAE+bJRpAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAJySURBVGje7ZjLahRBFIa/6hlBlCioGEURrIVK3kF8Id8sW3duIxgCgbgyCLXQpeCFmItmpsvN6XDSmenp6apyBjk/NDN9rfP3+c+twWAwGAwGg8FgMBgMBoPBYDAYDP8b3LwTIYRbwC/vfZ1zwRCCU2tHAO99TH1uNWexB8BZs1BmRCHhgDFQhRCcIpiPCPADOC+oAidr17KR+tLGc46fl/BG661PZY1GXpQgMk198ALUuQgsDPacHvDex5Y3Yu4XNR5g2IXkehgTZ/0v4W23JJErxwpLsIxHujy1TC1op9pidWSAl6oQwqV6MKsuqPMVMNJZK7WOJEtLMJJMVAHX5Xcix6ayXRRAued3O8WnyHQpaXnvL5FR+7Uy6iFwB3gkxh8C34Brar0J8DVn9zDOFGtRSFXADeAp8Bq4D7wD3ounbgIbwHfgDfBJSK2GSFsCar+R6jNgS4zeAJ4Dp8Cm/H4B9oHQEEnNfsnB3jJgKnLZBfaAn+KhLXlpx3JuG/iYs5/LWtklXm4D94C7wEvgFfAC2AHeAgfAZ+BENYzJwe6GGNu1YAhhJCSOxAuPgSfinQ/AH+/9pJ0FSzWNqfPGiWj/TCR0KLFyWmjGSY+ROZ3t8YxR4EhlN7f2REQiUZ7dDFE1UCv5xI7i+m+k1VPLle549T25CQz2SAih0xjV6kflnU4SOTroIdJyPYL9yuxRkkRSjHQZ1se4vteVTL9xyHWlB7CiM3tfj64qRlIJVGsVIwnfs2rtjVzpuBo4Efa6R422sVSQ9/ZIXzK6vqh7YolvWEsTSTGg6ZLX5XNRsbZiUYdQJNjbHx3WEW6Vnswpu7+oPQ95s+zYwgAAAABJRU5ErkJggg==";

		let sb1 = "iVBORw0KGgoAAAANSUhEUgAAADIAAAA+CAYAAABp/UjKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwRDAAWCgsg7AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAJHSURBVGje7Zi7jtNQEIY/50aWm7gVW7BIjKigokbQ8F68Di9AQQPUXAokKEALB1EgbcFNye7m5tg0vyUrYiPWPt540XySFSlxPOf3/DNzbHAcx3Ecx3Ecx3Ecx3Ecx3H+N5KTDhhCSEqxcwAzyxsREkLYBg6BfTPLGhDTUewOkOmoJah3xPe/dfG8oYxEFbFOyKII0JCtAJZAHsNW64RksQKc1PWTiv7+pyItMmBmeTkbTdykpII1evpfGtMadelU/M8QGGyifUefIyGEYbkpHCczK0Xf3Byp0EqL6+SF3UIIyeoCSwK6pUaTqoPVElTbGlrcADgH9LWwmY5iFuWK1ZMtLwHngQnwHTioO3h7EWvtKnBLCzwAvgEjLTaXyAvAdeCGsvAeGJvZuKk5UoUhcAe4B2wBn4GvwA/V0hawDdwErgFPJDZtciAee8BpQRmwAxhwV7b5qd/OAlf0GST0MNYOorYQFXYG/ALeAveB28Bl2a0QWBT4CHgOvAGmsVp4J1JGltpovtMCJ6XudEa2GijeHPgE7MtyaWuEqOMUYj7qTh9FXxbrK37epowUWSksNltz3kLndoGOmS1bJURZyYAPwGtZaJU58Ap4AUzNbL7Jvdbawgf2gMfArrrWpGSfMfBUHSvqZjPmHKG0TXkJPFItPAAeAhdVO8NS4adtF7KngZcAz4AvErBQVnpmNjo1b1FCCN3S9mUmkTvArplNT9XroBBCv3g+b+rpsClr/W1upG15knQcJ26nSlxsG/ZabZthzib5A1j61EUr22UtAAAAAElFTkSuQmCC";

		let sb5 = "iVBORw0KGgoAAAANSUhEUgAAADIAAAA+CAYAAABp/UjKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwRDAAKHgp8owAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAV9SURBVGje7ZlLbFRlFMd/M3M7lZaB8qrKQ+sBoRIUfGuIihjUGCExmrhwhQt3xsSFrtywMy40GqMrNSYkJkbRGN+PGJXIy0CJKeXhR1CkgKWF0hba6cy4+d/ky82d6bwKLO5JbqZ35n73fP9z/uf1FRJJJJFEEkkkkUQSSSSRRBJJJJFEEkkkkUQalVTcl8653cDbwGfAsJkVm6XQOZfydJcAzKw0xfMBcAPwDLDJzG6NPpcus/56YD2wAmhppuW06ZSuAEg751IewCiINDAHWAs8BPwX995yQALgPmAj0OWca4lT1IBHwg2WdFUCMRtYA6wDFgJf1QKkFegCHgOeBG4Eso2Ciawv6CqZWdGnlwdiJrAceEQeCYBd5SwfJ2eBNiDkYg7YBvQ550aaEDPFcnHhxUQHYMDjnjcGZOSqgfwMPAVkBaYdmC8wu5xzg7JkqRoPmFnJ98YUILLStVSeWC9GtAB/Av21APkW2AAs0P1y4Cpgltz9C3DGOTdZCYz/WxWg0wLRCayU/nXySg44BbwLHK4FyBgwEflukbJGuwLwO6DfOZefapNVeC0tQ10rBmwA7lGc5vTocWCHmRVqATIg5PM9TmaAuQq6DnnmB+Coc26slrjxaJYRZXJK+bcDDwB3KCbavGUXYow7ZUGcA9wLvKKXRgFfAA4B3wNfA73AOSkqhjER9VQEQKuo2gncJE/cBXTLYFlv6aji82WgP44B5TxyHvhVOXuFCpIvM7y4WQRsB/rk/iHn3Bgw7pwrRmpFoDVzZfFl2vhq6bla7854ui4CvwPvA0PlaFwOyCx99gF/6z4TA6ZLv3UDBwXkoDLLcWBY3it5FFqsAF6pdcuAeaJqOsKSCWA/8B7Qa2YXqFDB47LNoKiwQ9S5LsYrYeFcoJhZLOsNAqcVY8eAM0BewK9Rz7TUe2dbjJHCgtkLvAH8BiwBTtYUIxFerwW2APdX8GAY6CGNLirzDQjYpDY8V17JKQYyFfYwCLwOvANMmNn5SvsMqkgye8XPbvG6mlZnpq55AlHUpgPPgJWMOCm9XwJny6Xcanotn2ZjwE8qguM1lokwO82QB9IxcVAu/X+kzFiNsacG4r14K7BPtJlOGVFMbFewd9Y9WJWrLWY25N0Xa1lfhRSU5T4HXgOOmdloQxNiHW3GSW92yE7xeEkxUNKagoppP/CjUu2BWjvsplnUObcZeAJ4UIFeDsQpdbETip+zwDfKUj1m9lc9+oMmUmMrsFNtxMPq04KYjuFjWR0PzAGg3czO1Ku8mUCKqupbgB3Ac8AqT0deVfpDfQai1Tyg28z2NaI8aBKt1ojj51XNtwG3aCAKN3xA9eio0nJB9eG0Li4LEA1CaVGjVwGMAn69OtlWxcVJDUXbgLyZ5Zuds9P1LlRWyahI5rXhQPPES8DNui8CTrPLOTMbmY7ik25ksZmNe9mvBbgNeF6dbXgeNq4KnW/mQd90xEigOWIdsBm4WyAKqtI7gTfV1nMlA8kBjwIvaLYIQRwDPgW+0FxTmE4g6Sa8o1VpdolHpzzQA3ygA7W8EsTsK9IjzrmQVneqww2lRd7pUnyEZ1sjWpPVaUwWmG9mPZebWq06OFgSmfIyqiEvarN7nXMTStHD4eG1EsER51w7MNvMTtS7kVQD3siqKm8EntZhRGekaZwATgD/6u8jwB+a83Oa5w/La//oflE9/Vajh9Lh6WOHPPOsDtbaBKjFa19S8sCoPJaRhwY0Db4F7AZSXlq/dN2vAnhYG1+lqr5Qo/FSWT4VSTAlYEgdb1EHGHuAV+WhFbX2Xs2aR5ab2aGY7zcpqP3/UqV1MNGj3qxNNWg18Amw38zOXXKPVAFyRtxgZWaT3jOtoueIMtxorXr+B6o4zbyDaG06AAAAAElFTkSuQmCC";

		let sb9 = "iVBORw0KGgoAAAANSUhEUgAAADIAAAA+CAYAAABp/UjKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwRDAAQ42iF2QAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAASbSURBVGje7ZhPaFxVFMZ/M5nO5K+Nrca0kVpvq9Yi1PgPRUWpFEG60524FVy7EgTXrlRQ1IWIiIrdRHAharVSFMGKuoqpf05qWttGm6QZYzrJ5M1z8z15DO/NvDczbTb3gwdh8u679zvnfOece8DDw8PDw8PDw8PDw8PDw8PDw8PDo1sUkn40sxPAa8BHQNU51+jVhmZWiO0dAjjnwjbvl4AbgSeBp5xzrvm9Ysr63cBB4BZgSy8tp0MX9JSAopkVYgSbSRSBq4H7gUPAjqTvllL2qwAPAnPARTMzYKOV5XJ6JDpgqOd/7ySQ2ArcDjwM3Az0J303zSMrwLXAY8DjwE1AOclqHYYVQKAndM414kaKkRjW4R+VR0bTvp3mkTlgEtgPPAGMAFPAjJmt9EAzjTTvxjQxCjjgsLyxE+jLS+S0SIxIJ0PANSLznZktypJhFg8458K4N9qQKGuvPfLEQUXEgF4L8xCZBh6QaweVMfqBq/TbcWDBzFrqJv6/DKSLIjEmIx6SJ5wMGmE9DxEDFmSZkjLXBPCIvLMV+Aw4Z2b1bpJATA/9ykiTInGvsudI05JqHiJ/SfDxA/YB22KiGwaOArNmtppHN7Ew65ORRoAbgDuBh4C7pInBpqUhcCoPkVqKCwsicYeI7AQ+AabNbFlrGpEmmj3VRKCiUB0DbpUn7gH2yWDlhP03gLN5iFxQakzDQCynTwDfADPAGWDJzFaBNTNrNNWKktZskxH26uAHlFSu07fTstM68FseIrPAL8B9bcjsllX3ASdF5CRwTn9XgUsiEoXQ9RLwfq3bC2yXh4tpbRPQAP4AvspD5BLwrYphpQWZigrnqA5YAxalsV+18QJQF/FxZcA9wC61HoOt6kMM/wDvAJ/nIRIqc11QGLSq6CVZsqJ1O3TQA1q/qNge1LdG9JRFIEu3EEjkU865tbxEavJM0OK9tFZnWM92kWjo0KVY0sja7gQK8w+A+awHiBevecV5vYtWJMpOA/JAsY0OklAFXgdeVXjlalEA/pYlJhXbfWwOloBjzrl/84REHGvAG8CLIhRs4gWw2PELzrlAOftd4FNpZjMwBOxSL9YZU2mllqFAXi6E0shS1C6l3YmKGT62rloQbgKJBV0dpqN2J61BbUtEzeDXEv+VRBTaR4DlrkUk/Ay8p7pyJbCq1P+DwqqYcl3OR0TCfwv4XsXtcpP4AngWeEUVPWg3wirl2OAs8LJ6q3Flky09JtEAzmumdhQoJNxzykkZNGtoRV75GHgaeEFur/dY3AHwJzCr/YKEUNroRiMRmbqE/6aeao89sqiaNR8fXCQkgXxEkoTlnAvVgf7YqvfJgXXgop7jwIeRgZJSbVr6bdvVmlnaDOoU8Lvu2p0O7laALzXIGJc3zmSZuuQi4pwL1BqEKRed93XLm+jQE8eA59TLDSljBZ1MZTJZMmmQoN/7Jf7nlc3yZKc5rTsSCbibsVLWOhKm6KWm+vK2hFpX17ysOA8SvHAeOAG8pJDqSQ+XK7ZbjHjGgGeAu9Vg/qT7y2HgNh22KgJTGm7MOOdWYlPGKMzrvZj6e3j0CP8BxvyhAvDUCCYAAAAASUVORK5CYII=";

		let sb13 = "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";

		let sb17 = "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";
		

		//const blobUrl = cOURL(sb0); // blobURL
		sb0 = cOURL(sb0);
		sb1 = cOURL(sb1);
		sb5 = cOURL(sb5);
		sb9 = cOURL(sb9);
		sb13 = cOURL(sb13);
		sb17 = cOURL(sb17);

		return [
			sb0,
			
			sb1,
			sb1,
			sb1,
			sb1,
			
			sb5,
			sb5,
			sb5,
			sb5,

			sb9,
			sb9,
			sb9,
			sb9,

			sb13,
			sb13,
			sb13,
			sb13,

			sb17,
			sb17,
			sb17,
			sb17

			// sb21
		];
	}

	const siwaBrodaSS = sessionStorage.getItem("siwaBroda");
	let siwaBroda;
	if (siwaBrodaSS === 123) {
		siwaBroda = JSON.parse(siwaBrodaSS);
	} else {
		siwaBroda = siwaBrodaFn();
		sessionStorage.setItem("siwaBroda", JSON.stringify(siwaBroda));
	}

	const t0 = "letnia młodzieńcza bródka";
	const t1 = "letnia kozia bródka";
	const t5 = "letnia warkoczykowa bródka";
	const t9 = "letnia Mikołajowa broda";
	const t13 = "letnia artystyczna podwójna broda";
	const t17 = "letnia Boska broda";
	const titles = [
		t0,

		t1,
		t1,
		t1,
		t1,

		t5,
		t5,
		t5,
		t5,
		
		t9,
		t9,
		t9,
		t9,

		t13,
		t13,
		t13,
		t13,

		t17,
		t17,
		t17,
		t17

		// t21
	];


	var LSAges = localStorage.getItem("ages");
	let ages;
	if (LSAges) {
		ages = JSON.parse(LSAges);
	} else {
		ages = {};
	}

	const addSiwaBroda = (profileEl)=> {
		const nickB = profileEl.getAttribute("href").split("/");
		const nick = nickB[nickB.length-2];
		profileEl.style = "position: relative;";
		const avatarEl = profileEl.querySelector(".avatar");
		if (!avatarEl.classList.contains("male") && profileEl !== document.querySelector('.logged-user > a')) {return false;}
		avatarEl.style = "border-radius: 0 0 40% 40%; border-bottom: 0 !important;";
		const age = ages[nick];
		appendChild(profileEl, `<img class="siwaBroda" src="${siwaBroda[age]}" alt="${age}" title="${age} ${titles[age]}" style="position: absolute; left: -12%; min-height: 46.5px; min-width: 125%"></img>`);
		//console.log("addSB", profileEl);
	};
	
	const allFn = (scopeEl)=> {
	//console.log("allFn 0");
	const profiles = [].concat(
		document.querySelector('.logged-user > a'),
		Array.prototype.slice.call(scopeEl.querySelectorAll('[data-type="comment"] .profile')),
		Array.prototype.slice.call(scopeEl.querySelectorAll('[data-type="entry"] .profile')),
		Array.prototype.slice.call(scopeEl.querySelectorAll('[data-type="entrycomment"] .profile')),
		Array.prototype.slice.call(scopeEl.querySelectorAll('[data-submitflag="commentSubmit"] .profile'))

		
	);
	
	const currentDate = new Date();
	//let nickB = profile.getAttribute("href").split("/");
	//let nick = nickB[nickB.length-2];
	//console.log("allFn 0");
	profiles.forEach((profileEl, index)=>{
		//console.log("allFn 1", profileEl.querySelector(".siwaBroda"));
		if (profileEl.querySelector(".siwaBroda")) { return false; }
		const avatarEl = profileEl.querySelector(".avatar");
		if (!avatarEl.classList.contains("male") && profileEl !== document.querySelector('.logged-user > a')) {return false;}
		
		const nickB = profileEl.getAttribute("href").split("/");
		const nick = nickB[nickB.length-2];
		profileEl.style = "position: relative;";
		//profile.innerHTML += `<img src="${siwaBroda[0]}"></img>`;

		

		const addSiwaBrodaAndMutation = (profileEl)=> {
			addSiwaBroda(profileEl);

			let profileElObserver = new MutationObserver((mutations)=> {
				//console.log("prifilEl mutation");
				if (2 !== mutations[0].target.querySelector(".profile").childElementCount) {
					//console.log("profil mutation addSiwaBroda");
					addSiwaBroda(mutations[0].target.querySelector(".profile"));
				}
			});
			profileElObserver.observe( profileEl.parentElement.parentElement, {childList: true} );
		};

		if(ages[nick] === undefined) {
			fetch(`https://a.wykop.pl/profile/${nick}/appkey,tss651YJRF`)
			.then((response)=> {
			return response.json();
			}).then((json)=>{
				const singUpDate = new Date(json.signup_date); // np. "2014-11-10 19:07:59"
				const age = Math.floor((currentDate - singUpDate) / 31557600000); // 31557600000 is 24 * 3600 * 365.25 * 1000 which is the length of a year
				
				if (age >= 0) {
					ages[nick] = age;
					localStorage.setItem("ages", JSON.stringify(ages));

					addSiwaBrodaAndMutation(profileEl);
				} else if (json.error.code === 13) {
					console.log("error code 13", json, nick, ":", currentDate, "-", singUpDate, `(${json.signup_date}) =`, age);
				} else {
					console.log("error !age >= 0", json, nick, ":", currentDate, "-", singUpDate, `(${json.signup_date}) =`, age);
					const errString = `<img class="siwaBroda" src="" alt="[Error]" style="font-size: 11px; display: flex; position: absolute; left: 0;" title='Brody nie dodano z powodu błędu po stronie Wykop API: "${json.error.message}".\nPoproś administrację i moderację o zwiększenie limitu żądań dla dodatku "Siwa Broda".\nNapisz do #moderacja #administracja na mikroblogu lub w prywatnej wiadomości.\n[Komunikat dodatku: "Siwa Broda"]'></img>`;
					appendChild(profileEl, errString);

					let profileElErrObserver = new MutationObserver((mutations)=> {
						//console.log("profilEl mutation");
						if (2 !== mutations[0].target.querySelector(".profile").childElementCount) {
							//console.log("profil mutation errString");
							mutations[0].target.querySelector(".profile").style = "position: relative;";
							appendChild(mutations[0].target.querySelector(".profile"), errString);
						}
					});
					profileElErrObserver.observe( profileEl.parentElement.parentElement, {childList: true} );
				}
			}).catch((error)=>{
				console.log(error);
				const errString = `<img class="siwaBrodaError" src="" alt="[Error]" style="font-size: 11px; display: flex; position: absolute; left: 0;" title='Brody nie dodano z powodu błędu po stronie Wykop API: "${json.error.message}".\nPoproś administrację i moderację o zwiększenie limitu żądań dla dodatku "Siwa Broda".\nNapisz do #moderacja #administracja na mikroblogu lub w prywatnej wiadomości.\n[Komunikat dodatku: "Siwa Broda"]'></img>`;
				appendChild(profileEl, errString);

				let profileElCatchObserver = new MutationObserver((mutations)=> {
					//console.log("profilEl mutation");
					if (2 !== mutations[0].target.querySelector(".profile").childElementCount) {
						//console.log("profil mutation addSiwaBroda");
						mutations[0].target.querySelector(".profile").style = "position: relative;";
						appendChild(mutations[0].target.querySelector(".profile"), errString);
					}
				});
				profileElCatchObserver.observe( profileEl.parentElement.parentElement, {childList: true} );
			});
		} else {
			addSiwaBrodaAndMutation(profileEl);
		}
		//console.log("allFn");
	});
	


}
allFn(document);

	let subStreamFn = (target)=> {
		//console.log("wpis allFn", target);
		let childCount = target.childElementCount;
		target.setAttribute("data-childCount", childCount);
		allFn(target);
	}

	let subObserver = new MutationObserver(function(mutations) {
		let target = mutations[0].target;
		subStreamFn(target);
	});



	let wpisZeroObserver = new MutationObserver(function(mutations) {
		let liEl = mutations[0].target;
		let subEl = liEl.querySelector(".sub");
		//console.log("MOcommentsLi");
		if (liEl.childElementCount !== 1 && subEl) {
			//console.log("MOcommentsLi2");
			allFn(subEl);
			let subElChildCount = subEl.childElementCount;
			subEl.setAttribute("data-childCount", subElChildCount);
			subObserver.observe( subEl, {childList: true} );

			//console.log("MOcommentsLi3");
		}
	});

	let subZeroFn = ()=> {
		const streamElChildren = Array.prototype.slice.call( document.querySelector(".comments-stream").children );

		streamElChildren.forEach((liEl)=>{
			//console.log("commentsLi");
			if (liEl.childElementCount === 1) {
				//console.log("commentsLi2");
				wpisZeroObserver.observe( liEl, {childList: true} );
			}
		});
	}

	let streamObserver = new MutationObserver(function(mutations) {
		//console.log("streamO-1");
		let target = mutations[0].target;
		//console.log("streamO0");
		subStreamFn(target);
		
		subZeroFn();
	});

	const subEls = Array.prototype.slice.call( document.querySelectorAll(".sub") );

	subEls.forEach((subEl)=>{
		if (!subEl.hasAttribute("data-childCount")) {
			let subElChildCount = subEl.childElementCount;
			subEl.setAttribute("data-childCount", subElChildCount);
			subObserver.observe( subEl, {childList: true} );
		}
	});

	subZeroFn();

	const wpis = location.pathname.split("/")[1];
	if (wpis !== "wpis") {
		//console.log("wpis");
		const streamEl = document.querySelector(".comments-stream");
		if (!streamEl.hasAttribute("data-childCount")) {
			//console.log("stream has child");
			let streamElChildCount = streamEl.childElementCount;
			streamEl.setAttribute("data-childCount", streamElChildCount);
			streamObserver.observe( streamEl, {childList: true} );
			//console.log("stream has child end");
		}
	}
}

if (typeof $ == 'undefined') {
	if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
		// Firefox
		var $ = unsafeWindow.jQuery;
		main();
	} else {
		// Chrome
		addJQuery(main);
	}
} else {
	// Opera >.>
	main();
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}
