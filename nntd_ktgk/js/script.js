
// ===============================
// 1. DU LIEU KY NANG
// ===============================

const dsKyNang = [
    { ten: "HTML5", mucDo: "Co ban" },
    { ten: "CSS3", mucDo: "Co ban" },
    { ten: "JavaScript", mucDo: "Dang hoc" },
    { ten: "Java", mucDo: "Co ban" }
];

const hienThiKyNang = () => {
    const tbody = document.getElementById("skill-table-body");

    if (tbody) {
        tbody.innerHTML = dsKyNang
            .filter(skill => skill.ten !== "")
            .map((skill, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${skill.ten}</td>
                    <td>${skill.mucDo}</td>
                </tr>
            `).join("");
    }
};

hienThiKyNang();


// ===============================
// 2. FETCH API DOC DU LIEU JSON
// ===============================

const hienThiDuAn = async () => {
    const projectList = document.getElementById("project-list");

    if (!projectList) return;

    try {
        const response = await fetch("js/data.json");

        if (!response.ok) {
            throw new Error("Khong the doc file JSON!");
        }

        const dsDuAn = await response.json();

        projectList.innerHTML = "";

        dsDuAn.forEach(duAn => {
            const article = document.createElement("article");

            const ten = document.createElement("h3");
            ten.textContent = duAn.ten;

            const moTa = document.createElement("p");
            moTa.textContent = duAn.moTa;

            const congNghe = document.createElement("p");
            congNghe.textContent = "Cong nghe: " + duAn.congNghe;

            article.appendChild(ten);
            article.appendChild(moTa);
            article.appendChild(congNghe);

            projectList.appendChild(article);
        });

    } catch (error) {
        console.error("Loi Fetch API:", error);

        projectList.textContent =
            "Khong the tai du lieu du an. Vui long thu lai sau!";
    }
};

hienThiDuAn();


// ===============================
// 3. LOCALSTORAGE - DARK MODE
// ===============================

const themeButton = document.getElementById("theme-button");

const apDungGiaoDien = (theme) => {
    document.body.classList.toggle("dark-mode", theme === "dark");
};

const themeDaLuu = localStorage.getItem("theme") || "light";

apDungGiaoDien(themeDaLuu);

if (themeButton) {
    themeButton.addEventListener("click", () => {

        const dangToi = document.body.classList.toggle("dark-mode");

        const themeMoi = dangToi ? "dark" : "light";

        localStorage.setItem("theme", themeMoi);
    });
}


// ===============================
// 4. XU LY FORM LIEN HE
// ===============================

const form = document.getElementById("contact-form");

if (form) {
    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const birthday = document.getElementById("birthday").value;
        const message = document.getElementById("message").value.trim();

        const thongBao = document.getElementById("form-message");

        if (fullname.length < 2) {
            thongBao.textContent = "Ho ten phai co it nhat 2 ky tu!";
            thongBao.style.color = "red";
            return;
        }

        if (email === "" || !email.includes("@")) {
            thongBao.textContent = "Email khong hop le!";
            thongBao.style.color = "red";
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            thongBao.textContent = "So dien thoai phai co dung 10 chu so!";
            thongBao.style.color = "red";
            return;
        }

        if (birthday === "") {
            thongBao.textContent = "Vui long chon ngay sinh!";
            thongBao.style.color = "red";
            return;
        }

        if (message === "") {
            thongBao.textContent = "Vui long nhap noi dung!";
            thongBao.style.color = "red";
            return;
        }

        thongBao.textContent = "Gui thong tin thanh cong!";
        thongBao.style.color = "green";

        form.reset();
    });
}
