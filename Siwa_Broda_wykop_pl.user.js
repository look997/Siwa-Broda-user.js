// ==UserScript==
// @name		Siwa Broda
// @namespace		http://www.wykop.pl/ludzie/look997/
// @description		Siwa broda pod awatarem. Tym dłuższa, im dłuższy staż na wykopie.
// @author		look997
// @version		1.5 beta
// @grant		none
// @include		http://www.wykop.pl/*
// @date           2016-12-15
// @resource       metadata https://github.com/look997/Siwa-Broda/raw/master/Siwa_Broda_wykop_pl.user.js
// @downloadURL    https://github.com/look997/Siwa-Broda/raw/master/Siwa_Broda_wykop_pl.user.js
// @updateURL      https://github.com/look997/Siwa-Broda/raw/master/Siwa_Broda_wykop_pl.user.js
// @run-at 		document-end
// ==/UserScript==

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

	let sb0 = "iVBORw0KGgoAAAANSUhEUgAAACgAAAA+CAYAAABZcVnrAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwOFDcT8CnBVgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAJbSURBVGje7ZdPixQxEMV/yYwgLqugoi6KYA4q+x3EL+Q38+rNq4KysKAnFyEHPQr+YXV31ZmOl+olE2d7Up3MzCUPmp7umaTevKq8VKChoaGhoaGhoaGhoaGhoaGhYVswAN77q8BP51xXc3LvvYniBADnXNDMYb33d4CzfoLKCELOAFOJZyLiqwkC34G/a8yQkTidXGjEmAq56uolKs0lRp9mNATnmgEj0I0htrBIairmnAuJeqFEgOmKgOepzwgSln0uzY4ZIPjfuzWXgk7BIWU1XpZaitoHleR671zws2W+Fn1vgUm8ijU+qEqxYCIr0wKX5T6Td3O5zo1ZxvxOrSy3XC5MsXNugWT03EXB9oDrwF0hdQR8BS5Fc8+AL2N3q+mIug1C1gJXgAfAM+AW8Bp4I8ruALvAN+AF8FHI1iWYpiJ67svjIbAvZHaBR8ApcFvun4FDwPcENW6gWiTJxHNJ21vgAPghiu7LH/8l3z0HPozd70fvJFKP14CbwA3gCfAUeAy8Al4C74BPwEnUKKgWiVlFYmgi7/1EyB2LaveA+6Lme+CPc26WuoK2WSjt906kts4klUdSi6c1uiRbOL6TWktbtuNotZutEZRUBZmnb047oIvSGAZMvyzFmbVi4w4mHlNCLEtB7/1gkKglC5Gag+S0HZEttKGwrPerRS67BocC5gTN/d0YmwkKu1lLY1vtTJKbgdo1WErMbqQGC87DXazeGNuxJYOT4GbZSbC0Hm1mm3+hP0ZjQukZeJBgycR917ORY2mN7Um7I6kWSXpY2jbMppQfm/5/d/APeWtfywwAAAAASUVORK5CYII=";

	let sb1 = "iVBORw0KGgoAAAANSUhEUgAAACgAAAA+CAYAAABZcVnrAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwOFDUL0XM7ggAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAI5SURBVGje7Ze7bhNBFIa/Xa+Nw03cihQEiSMqqKhRaHgvXocXoKABai4FEhSgwCAKpBTcZCfxbb1L84+0siB4xlk7EvNJqy12Z84/5zYzkEgkEolEIpFIJBKJRCKR2BRZm5M757KGnRrAzOoggc65beAIODCzqgWRuQTmQKVnaaEF8EuD6pY8GC3OC5z5gS2FF2AO1KHh9QKrmIEBrDR/tkT+LJXc3mNmVje9t+ris38YLPRPGRuiVcmX+N4Hem23pJX6oHOu3yymEE8uFEt4H4xoGX5M7cPunMsWDTeEdZQqKFXmIUKziNbRA84BXRmc6PG9tNa8hdLjEnAeGAHfgMOQDaGIzNurwC0ZPgS+AgOJqCX+AnAduCGvvQOGZjYM7YMx9IE7wD1gC/gEfAG+K1e3gG3gJnANeKxFlDGNOrjxylAF7AAG3FX4fujbWeCK3k4LOIrZsYIEqiAq4CfwBtgFbgOXFXYv3BfGAHgGvAbGMa0qj/DgXAeMtzI8alTrGYW3p7mnwEfgQKEvWxeoCvQiP8gzf6OrUHdlq16HB70Xfagnx/w3078dIDez+VoEyosV8B54pVAuMgVeAs+BsZlN29iLjy0YYB94BOypikeNMA6BJ6rg6ENGbB+ksd29AB4q1+4DD4CLys1+o2DKTQncVyPOgKfAZwmbyYuFmQ02fqtzznUa2+BE4neAPTMbn4prp3Ou6+8fJ3GaPokQ/6nvlZs4eScSp5bFS9F/t4h8TRqzlGub4jeA49RFFg5nAgAAAABJRU5ErkJggg==";

	let sb5 = "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";

	let sb9 = "iVBORw0KGgoAAAANSUhEUgAAACgAAAA+CAYAAABZcVnrAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwOFDYAbYyxyQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAARuSURBVGje7ZhNaBx1GMZ/OzvN99qYakxbqfWfVmsRtH6hqCiVIEhvepNeC549CYLnnqygqAcRERV7ieBB1GqlKIIV9RRTrW9irG2j3aTZxrjJZna8PBPGcWZ3k2wThHlgIJvkP//nfd/n/VrIkSNHjhw5cuTIkSNHjhw5cuRYKwpmdhp4BfgAqDjn6u16uZkVonuAEMA5Fzb5fx+4GXgaOOwBu4GDwK3AlnZaLzIFPT7gmVkhRjxJzgOuBR4ERoDtPtAJPAxMAZfNzIDlRpau0oPRxaGeFW+mkNsK3Ak8CtwCdHnAPHA98ATwJLAX6Eizco3hBQj0hM65etz4GLk+kXpcHuxHbp8CDgD7gaeAEjAKjJvZfBs0Wc+KRkxz/YADDsl7O4BiRPA3kStJh73AdSL5jZnNyPKwFY8558K495qQ69Bdw/LcQUWwW/8W+sAY8JBc3KMM6gKu0e9OAWUza6jL+N9aMMYTuUE5Z0Sec3JUhCUfMKAsS3xl8k7gMXlzK/AJcMHMautJnpjeuoDtktYIcL+qSSlxpOIDfyhR4hcXgYGYWPuAE8CEmS2sRpexcBdlfAm4CbgbeAS4R5rrSRwNgUkfqAJLaUVc5O4SwR3AR8CYmc3pTD3SXNKzCWKdkswgcJs8dx+wT47oSLl/GTjvA5dUArLQHdUkhf4rYBw4B8ya2QKwaGb1RK3zdWZAxu0RoTuUjDfo3cWMe5eAsz4wAfwEPNCE5G55YR9wRgTPABf0cwX4WwSjUN4o4e/XuT3ANkXEkyGppQn4FfjC10u/VpHubECyUwW9XxdXgRlp+Ge9sAzUZNCQKsIwsEstrKeBx+K4ArwFfOrLYlOoBxpYFdVNT2RDZeKwwnZJhJdFZEBeLEljxSbvjnedSWDUObcYEazKk4FINIKX+NynZ5vI1UXGjyVbq20zkNzeA6YBPGXftHRUW0dLi7K1Wx7zmugsDRXgVeBlhXnFyj/F/IC0U2RzMAucdM79lQzXIvAacFREg00cor3/fHDOBcBZ4G3gY2lyM9AL7FKv/jdbabHaQuG+Wgilwdmo7ZpZwUup3uXkxLtB5Moa8caitumcC73EyFQHvlTSbCQiiR0H5hrVNIAfgXdUFzcCCypx3ym8Xnzg8FIGzwB4A/hWRfdqk/sMeBZ4SR0krv9CVtc4DxxT7x1Sdm1pM7k6cFE7+QmgkDJndngZ43sAfAgcAV6Q+2ttTooA+B2Y0H1Byia57DXYMWpKmNf1VNrswRnV3On4wpVMHi9jj12pjc65ReD7qDeuE0vAZT2ngPcjw9N2HedcGNegZ2ZZO+wk8It2ibUu9PPA51rAhuS9c822QD+uO7WYMGOAfFdT8c41eu4k8Jx6fa8yOGi2JaZ+iZN2yMy6lDTPK7tXk61TOndcMyOtrq9pdTDM0GNV9fFNCbymKWhOOgpSvHYROA28qNCuuscXGu2zGavkIPAMcK8Gix80Px4CbheJioiNaikbd87Nx75ViKRVa8e3aDn+1/gHUWGfgirUhPoAAAAASUVORK5CYII=";

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

function main() {
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
	
	const allFn = (scopeEl)=> {
	//console.log("allFn 0");
	const profiles = [].concat(
		Array.prototype.slice.call(scopeEl.querySelectorAll('[data-type="comment"] .profile')),
		Array.prototype.slice.call(scopeEl.querySelectorAll('[data-type="entry"] .profile')),
		Array.prototype.slice.call(scopeEl.querySelectorAll('[data-type="entrycomment"] .profile')),
		Array.prototype.slice.call(scopeEl.querySelectorAll('[data-submitflag="commentSubmit"] .profile'))
	);
	
	const currentDate = new Date();
	//let nickB = profile.getAttribute("href").split("/");
	//let nick = nickB[nickB.length-2];
	//console.log("allFn 0");
	profiles.forEach((profileEl)=>{
		//console.log("allFn 1", profileEl.querySelector(".siwaBroda"));
		if (profileEl.querySelector(".siwaBroda")) { return false; }
		profileEl.style = "position: relative;";
		const nickB = profileEl.getAttribute("href").split("/");
		const nick = nickB[nickB.length-2];
		//profile.innerHTML += `<img src="${siwaBroda[0]}"></img>`;

		const addSiwaBroda = (profileEl)=> {
			profileEl.style = "position: relative;";
			
			const avatarEl = profileEl.querySelector(".avatar");
			if (!avatarEl.classList.contains("male")) {return false;}
			avatarEl.style = "border-radius: 0 0 40% 40%";
			
			const age = ages[nick];
			appendChild(profileEl, `<img class="siwaBroda" src="${siwaBroda[age]}" alt="${age}" title="${age} ${titles[age]}" style="position: absolute; left: 0; min-height: 46.5px;"></img>`);
			//console.log("addSB", profileEl);
		};

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
			fetch(`http://a.wykop.pl/profile/${nick}/appkey,tss651YJRF`)
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
				const errString = `<img class="siwaBroda" src="" alt="[Error]" style="font-size: 11px; display: flex; position: absolute; left: 0;" title='Brody nie dodano z powodu błędu po stronie Wykop API: "${json.error.message}".\nPoproś administrację i moderację o zwiększenie limitu żądań dla dodatku "Siwa Broda".\nNapisz do #moderacja #administracja na mikroblogu lub w prywatnej wiadomości.\n[Komunikat dodatku: "Siwa Broda"]'></img>`;
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
