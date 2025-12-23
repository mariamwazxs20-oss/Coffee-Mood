 const msg = document.querySelector('#msg');

    /*رفع كتابك*/ 
    document.querySelector('#uploadForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = ' جاري رفع الكتاب...';

      const formData = new FormData();
      formData.append('title', document.querySelector('#title').value);
      formData.append('author', document.querySelector('#author').value);
      formData.append('file', document.querySelector('#file').files[0]);

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (res.ok) {
          msg.textContent = ' تم رفع الكتاب بنجاح';
          loadBooks();
        } else {
          msg.textContent = ' فشل في رفع الكتاب ' + (data.message || '');
        }
      } catch (err) {
        msg.textContent = ' تعذر الاتصال بالخادم';
      }
    });

    /*تحميل*/ 
    async function loadBooks() {
      const res = await fetch('/api/books');
      const books = await res.json();
      const list = document.querySelector('#booksList');
      list.innerHTML = '<h2><i class="fa-solid fa-book"></i> الكتب المرفوعة</h2>';

      books.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book-item';
        div.innerHTML = `
          <div class="book-info">
            <strong>${book.title}</strong>
            <small>${book.author}</small>
            <a href="${book.file}" target="_blank">📖 فتح الكتاب</a>
          </div>
          <div class="actions">
            <button onclick="editBook('${book._id}', '${book.title.replace("'","\'")}', '${(book.author||'').replace("'","\'")}')"><i class="fa-solid fa-pen"></i></button>
            <button onclick="deleteBook('${book._id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        `;
        list.appendChild(div);
      });
    }

    /*حدف*/ 
    async function deleteBook(id) {
      if (!confirm("هل أنت متأكد أنك تريد حذف هذا الكتاب؟")) return;
      const res = await fetch(`/api/books/${id}`, { method: 'DELETE' });
      const data = await res.json();
      msg.textContent = data.message;
      loadBooks();
    }

    /* تعديل كتاب*/
    async function editBook(id, oldTitle, oldAuthor) {
      const title = prompt("أدخل العنوان الجديد:", oldTitle);
      const author = prompt("أدخل المؤلف الجديد:", oldAuthor);
      if (!title || !author) return;

      const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
      });
      const data = await res.json();
      msg.textContent = data.message;
      loadBooks();
    }

    /* تسجيل الخروج  */  
    document.querySelector('#logoutBtn').addEventListener('click', () => {
      fetch('/api/logout', { method: 'POST' }).then(() => {
        window.location.href = 'register.html';
      });
    });