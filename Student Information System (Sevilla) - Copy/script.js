function $(sel){return document.querySelector(sel)}

function goTo(page){ window.location.href = '/' + page }

document.addEventListener('DOMContentLoaded', () => {
	const searchInput = $('#searchInput')
	const searchBtn = $('#searchBtn')
	const results = $('#searchResults')
	const settingsBtn = $('#settingsBtn')
	const settingsMenu = $('#settingsMenu')

	if (settingsBtn) {
		settingsBtn.addEventListener('click', ()=> settingsMenu.classList.toggle('hidden'))
	}

	// logout links in header: call server logout then redirect to login.html
	const logoutLinks = document.querySelectorAll('a[href="/logout"]')
	logoutLinks.forEach(link => {
		link.addEventListener('click', async (e) => {
			e.preventDefault()
			try {
				await fetch('/logout', { method: 'GET', credentials: 'same-origin' })
			} catch (err) {
				// ignore fetch errors — we'll redirect anyway
			}
			window.location.href = 'login.html'
		})
	})

	if (searchBtn) {
		searchBtn.addEventListener('click', doSearch)
		searchInput.addEventListener('keydown', (e)=> { if(e.key==='Enter') doSearch() })
	}

	async function doSearch(){
		const q = searchInput.value.trim();
		if (!q) { results.classList.add('hidden'); results.innerHTML=''; return }
		try {
			const r = await fetch('/api/search?q=' + encodeURIComponent(q))
			if (!r.ok) throw new Error('no api')
			const data = await r.json()
			renderResults(data)
		} catch (err) {
			// fallback to localStorage-based search
			const items = [];
			try{
				const raw = localStorage.getItem('students');
				if(raw){
					const s = JSON.parse(raw);
					for(const st of s){
						const name = ((st.last||'') + ' ' + (st.first||'')).trim();
						if(name.toLowerCase().includes(q.toLowerCase()) || (st.sid||'').includes(q) || (st.dept||'').toLowerCase().includes(q.toLowerCase())){
							items.push({ student_id: st.sid, name, department: st.dept, section: st.section })
						}
					}
				}
			}catch(e){ }
			renderResults(items)
		}
	}

	function renderResults(items){
		if (!items || items.length===0) {
			results.innerHTML = '<p>No results</p>'
			results.classList.remove('hidden')
			return
		}
		const html = ['<table class="table"><thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Year & Section</th></tr></thead><tbody>']
		for (const it of items) {
			const sid = it.student_id||it.id||'';
			html.push(`<tr style="cursor:pointer" onclick="selectResult('${encodeURIComponent(sid)}')"><td>${escapeHtml(sid)}</td><td>${escapeHtml(it.name)}</td><td>${escapeHtml(it.department||'')}</td><td>${escapeHtml(it.section||'')}</td></tr>`)
		}
		html.push('</tbody></table>')
		results.innerHTML = html.join('\n')
		results.classList.remove('hidden')
	}

	// allow clicking results to jump to student row or redirect to students page
	window.selectResult = function(sidEnc){
		const sid = decodeURIComponent(sidEnc||'')
		results.classList.add('hidden')
		results.innerHTML = ''
		function idFromSid(s){ return 'student-' + String(s).replace(/[^a-zA-Z0-9_-]/g,'_') }
		const targetId = idFromSid(sid)
		const el = document.getElementById(targetId)
		if(el){ el.scrollIntoView({behavior:'smooth', block:'center'}); el.classList.add('highlight'); setTimeout(()=>el.classList.remove('highlight'),2000); return }
		// not on this page — go to students page with hash
		window.location.href = 'students.html#' + targetId
	}

	function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"']/g, c=>({
		'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
	})[c]) }

})

// Settings helpers: theme and account management
function applyTheme(theme){
	try{ if(!theme) theme = localStorage.getItem('theme') || 'dark'; }
	catch(e){ theme = theme||'dark' }
	document.body.setAttribute('data-theme', theme);
}

function toggleThemeSelection(value){
	if(!value) return;
	localStorage.setItem('theme', value);
	applyTheme(value);
}

function initSettings(){
	// apply saved theme
	const current = localStorage.getItem('theme') || 'dark';
	applyTheme(current);
	const light = document.getElementById('themeLight');
	const dark = document.getElementById('themeDark');
	if(light) light.checked = current === 'light';
	if(dark) dark.checked = current === 'dark';
	if(light) light.addEventListener('change', ()=> toggleThemeSelection('light'))
	if(dark) dark.addEventListener('change', ()=> toggleThemeSelection('dark'))

	// account
	const acc = JSON.parse(localStorage.getItem('account')||'{}');
	const dn = document.getElementById('displayName');
	const em = document.getElementById('accountEmail');
	if(dn) dn.value = acc.name || '';
	if(em) em.value = acc.email || '';
	const saveBtn = document.getElementById('saveAccountBtn');
	if(saveBtn) saveBtn.addEventListener('click', saveAccount);

	const changeBtn = document.getElementById('changePasswordBtn');
	if(changeBtn) changeBtn.addEventListener('click', changePassword);

	const logoutBtn = document.getElementById('logoutBtn');
	if(logoutBtn) logoutBtn.addEventListener('click', ()=> window.location.href='login.html');

	const clearBtn = document.getElementById('clearDataBtn');
	if(clearBtn) clearBtn.addEventListener('click', ()=>{ if(confirm('Clear all local data?')){ localStorage.clear(); alert('Local data cleared'); location.reload(); } });
}

function saveAccount(){
	const dn = document.getElementById('displayName');
	const em = document.getElementById('accountEmail');
	const acc = { name: (dn||{}).value||'', email: (em||{}).value||'' };
	localStorage.setItem('account', JSON.stringify(acc));
	alert('Account saved locally');
}

function changePassword(){
	// This is a local/demo implementation — no real auth backend.
	const cur = document.getElementById('currentPassword')||{};
	const nw = document.getElementById('newPassword')||{};
	const conf = document.getElementById('confirmPassword')||{};
	if(!nw.value) return alert('Enter a new password');
	if(nw.value !== conf.value) return alert('New password and confirmation do not match');
	// store a local hashed (not secure) password demo
	try{ localStorage.setItem('password', btoa(nw.value)); alert('Password changed (local demo)'); cur.value=''; nw.value=''; conf.value=''; }
	catch(e){ alert('Failed to change password') }
}

// auto-init settings when settings page loads
document.addEventListener('DOMContentLoaded', ()=>{ if(document.querySelector('.settings-panel')) initSettings(); });
