// Переменные для работы с DOM
const recipeList = document.getElementById("recipe-list");
const adminRecipeList = document.getElementById("admin-recipe-list");
const addRecipeForm = document.getElementById("add-recipe-form");
const recipeModal = document.getElementById("recipe-modal");
const closeModalButton = document.querySelector("#recipe-modal .close");
const adminLoginForm = document.getElementById("admin-login-form");
const adminPanel = document.getElementById("admin-panel");
const adminLoginLink = document.getElementById("admin-login-link");

// Закрытие модального окна администратора
const adminLoginModal = document.getElementById("admin-login-modal");
const closeModalButtons = document.querySelectorAll(".modal .close");

closeModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.closest("#admin-login-modal")) {
            adminLoginModal.style.display = "none";
        }
    });
});

// Закрытие модального окна при клике вне его области
window.addEventListener("click", (e) => {
    if (e.target === adminLoginModal) {
        adminLoginModal.style.display = "none";
    }
});



// Пример данных рецептов
let recipes = [
    {
        id: 1,
        title: "Пельмени с говядиной",
        description: "Самое то для зимнего выходного — сесть и налепить всей семьей пельменей с говядиной.",
        instructions: `
            Для фарша не очень жирную грудинку прокрутить вместе со сливочным маслом через мясорубку.
            Нарезать мелко лук и петрушку.
            Лук пропассеровать на подсолнечном масле.
            Фарш посолить и поперчить по вкусу.
            Добавить в фарш измельченную петрушку и пассерованный лук.
            Все хорошо перемешать и убрать в холодильник ровно на час, чтобы фарш окреп и стал эластичным.
            Тесто раскатать скалкой до толщины 1 мм и вырезать из него кружки диаметром 4,5 см.
            Выложить на каждый по 5 грамм начинки, свернуть пополам, защипнуть края и соединить уголки.
            Подготовить бульон: налить в кастрюлю 5 литров воды, посолить, положить лавровый лист, черный перец горошком и веточки укропа целиком. В кипящую воду бросить пельмени и варить 5–6 минут до готовности.
            Подать со сметаной.
        `,
        views: 0
    },
    {
        id: 2,
        title: "Классический борщ",
        description: "Борщ — суп с множеством вариаций: от классических рецептов с мясом на кости до легких вегетарианских и оригинальных холодных версий.",
        instructions: `
            Приготовление бульона. Залейте водой мясо на кости и доведите до кипения на среднем огне. После закипания удалите пену, закройте кастрюлю крышкой и томите на медленном огне в течение 1,5 часа.
            Подготовка зажарки. Очистите и подготовьте овощи: свеклу натрите на крупной терке, морковь — на средней, а лук мелко нарежьте кубиками.
            Жарка овощей. На сковороде с маслом обжарьте свеклу, морковь и лук. Через пять минут добавьте кислоту для сохранения яркого цвета свеклы и легкой кислинки борща. Затем добавьте томатную пасту и тушите еще пять минут.
            Сборка борща. Мясо извлеките из бульона и дайте ему остыть. Затем нарежьте и верните обратно в процеженный бульон вместе с нашинкованной капустой и картофелем.
            Добавление зажарки. После добавления мяса в бульон введите зажарку и приправьте суп солью, перцем и другими специями по вкусу. Варите еще несколько минут.
            Финальный штрих. За пару минут до готовности добавьте в борщ измельченную зелень, чеснок или гвоздику для аромата и оставьте настаиваться еще пять минут.
        `,
        views: 0
    },
    {
        id: 3,
        title: "Вареники с картошкой и луком",
        description: "Бекон и кольца лука тут не столько для украшения, сколько для гармонии: дополнить простой вкус начинки.",
        instructions: `
            Картофель для пюре отварить и промять толкушкой, чтобы остались небольшие комочки: так как начинка очень простая, ей обязательно нужна неоднородная текстура.
            Дать картофелю остыть и смешать его с 120 граммами сливочного масла и пассерованным репчатым луком. Поперчить и посолить, хорошо все перемешать.
            Тесто раскатать скалкой до толщины 1 мм и кулинарным кольцом диаметром 4,5 см вырезать из него кружки. Выложить на каждый по 5 грамм начинки, свернуть пополам и защипнуть края в виде косички.
            В большую кастрюлю налить 5 литров воды, добавить соль, лавровый лист, раздавленные зубчики чеснока, черный перец горошком и веточки укропа целиком. Когда вода закипит, опустить вареники в кастрюлю и варить 5–6 минут.
            Ломтики бекона поджарить на оливковом масле до золотистой хрустящей корочки с обеих сторон и выложить на салфетку, чтобы избавиться от лишнего масла.
            Лук-шалот нарезать тонкими кольцами, немного обвалять их в муке и обжаривать около 5 минут на сковороде с 1 столовой ложкой оливкового и 15 граммами сливочного масла — до хрустящей золотистой корочки. Также выложить на салфетку и посолить.
            Подавать вареники с ломтиками бекона и хрустящими луковыми кольцами.
        `,
        views: 0
    },
    {
        id: 4,
        title: "Вафельные трубочки с вареной сгущенкой",
        description: "Очередной простой советский рецепт, один из любимых десертов детства — трубочки с вареной сгущенкой.",
        instructions: `
            Взбить 200 грамм размягченного сливочного масла с сахаром, затем добавить яйца, перемешать, всыпать муку и замесить однородное тесто, по консистенции похожее на тесто для оладий.
            Разогреть вафельницу и вылить в центр примерно 50 мл теста, закрыть и жарить 3–4 минуты, пока тесто не подрумянится.
            Горячую вафлю сразу же скрутить в трубочку, воспользовавшись специальной металлической трубочкой. Если такой нет, то можно обернуть карандаш несколькими слоями фольги, чтобы набрать толщину. Как только вафля остынет, она потеряет гибкость и будет ломаться, поэтому действовать нужно быстро. Таким образом приготовить все тесто.
            Для крема взбить вареную сгущенку с оставшимся сливочным маслом и переложить в кондитерский мешок.
            Наполнить трубочки кремом с обеих сторон. Вафли должны быть остывшими, иначе крем начнет таять и течь.
        `,
        views: 0
    },
    {
        id: 5,
        title: "Молочный суп с вермишелью",
        description: "У молочного супа с вермишелью дурная слава, но дело не в самом сочетании, а в пенке, которую повара детских садов ленились снимать.",
        instructions: `
            Подготовить необходимые ингредиенты.
            Налить молоко в кастрюлю.
            Довести до кипения.
            Добавить сахар и соль.
            Положить в кастрюлю вермишель.
            Размешать молоко с вермишель.
            Варить около 10 минут, время от времени снимая пенку.
            Ближе к концу готовки добавить кусочек сливочного масла.
            Подождать, пока он растопится.
            Подать.
        `,
        views: 0
    },
    {
        id: 6,
        title: "Торт «Муравейник»",
        description: "Советский десерт, у которого есть много родственников по всему миру, от Америки до Индии.",
        instructions: `
            Подготовить необходимые ингредиенты.
            Просеять муку.
            Смешать с 200 г сливочного масла, с сахаром, сметаной, щепоткой соли и содой.
            Замесить однородное тесто, обернуть его пищевой пленкой и убрать в холодильник на 20 минут.
            Охлажденное тесто прокрутить через мясорубку.
            Равномерно распределить на застеленном пекарской бумагой противне. Отправить в духовку, разогретую до 200 градусов, на 10 минут.
            Размягченное масло смешать миксером с вареным сгущеным молоком.
            Готовые печенья раскрошить в неравномерную крошку. Смешать в кремом.
            Выложить массу на блюдо, придавая ей форму муравьиной горки.
            Посыпать торт маковыми зернами и убрать в холодильник минимум на 3 часа.
        `,
        views: 0
    }
];

// Функция для отображения рецептов на главной странице
function renderRecipes() {
    recipeList.innerHTML = "";
    recipes.forEach(recipe => {
        const recipeItem = document.createElement("div");
        recipeItem.classList.add("recipe-item");
        recipeItem.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
        `;
        recipeItem.addEventListener("click", () => openRecipeModal(recipe));
        recipeList.appendChild(recipeItem);
    });
}

// Функция для открытия модального окна с полным рецептом
function openRecipeModal(recipe) {
    // Увеличиваем счетчик просмотров
    recipe.views += 1;

    // Заполняем модальное окно данными рецепта
    document.getElementById("recipe-modal-title").innerText = recipe.title || "Название не указано";
    document.getElementById("recipe-modal-description").innerText = recipe.description || "Описание не указано";
    document.getElementById("recipe-modal-instructions").innerText = recipe.instructions || "Инструкции не указаны";

    // Открываем модальное окно
    recipeModal.style.display = "flex";

    // Обновляем "Рецепт дня"
    renderRecipeOfTheDay();
}

// Закрытие модального окна
closeModalButton.addEventListener("click", () => {
    recipeModal.style.display = "none";
});

// Функция для отображения рецепта дня
function renderRecipeOfTheDay() {
    // Находим рецепт с максимальным количеством просмотров
    const recipeOfDay = recipes.reduce((max, current) => 
        (current.views > max.views ? current : max), recipes[0]
    );

    const recipeOfDayElement = document.getElementById("recipe-of-the-day");
    recipeOfDayElement.innerHTML = `
        <div class="recipe-of-the-day-item">
            <h3>${recipeOfDay.title}</h3>
            <p>${recipeOfDay.description}</p>
        </div>
    `;

    // Добавляем обработчик клика на весь блок
    recipeOfDayElement.querySelector(".recipe-of-the-day-item").addEventListener("click", () => {
        openRecipeModal(recipeOfDay);
    });
}

// Функция для отображения рецептов в админке
function renderAdminRecipes() {
    adminRecipeList.innerHTML = "";
    recipes.forEach(recipe => {
        const adminRecipeItem = document.createElement("div");
        adminRecipeItem.classList.add("admin-recipe-item");
        adminRecipeItem.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
            <button class="delete-recipe-button" data-id="${recipe.id}">Удалить</button>
        `;
        adminRecipeList.appendChild(adminRecipeItem);
    });

    // Добавляем обработчики для кнопок удаления
    const deleteButtons = document.querySelectorAll(".delete-recipe-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const recipeId = parseInt(button.getAttribute("data-id"));
            deleteRecipe(recipeId);
        });
    });
}

// Функция для добавления нового рецепта
addRecipeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = addRecipeForm.querySelector("input").value;
    const description = addRecipeForm.querySelector("textarea:nth-of-type(1)").value;
    const instructions = addRecipeForm.querySelector("textarea:nth-of-type(2)").value;

    if (title && description && instructions) {
        const newRecipe = {
            id: Date.now(),
            title,
            description,
            instructions,
            views: 0
        };
        recipes.push(newRecipe);
        renderRecipes();
        renderAdminRecipes();
        addRecipeForm.reset();
    } else {
        alert("Заполните все поля!");
    }
});

// Функция для удаления рецепта
function deleteRecipe(recipeId) {
    recipes = recipes.filter(recipe => recipe.id !== recipeId);
    renderRecipes();
    renderAdminRecipes();
}

// Обработка формы входа администратора
adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const login = adminLoginForm.querySelector("input[type='text']").value;
    const password = adminLoginForm.querySelector("input[type='password']").value;

    if (login === "admin" && password === "1234") {
        document.getElementById("admin-login-modal").style.display = "none";
        adminPanel.style.display = "block";
        renderAdminRecipes();
    } else {
        alert("Неверный логин или пароль!");
    }
});

// Открытие модального окна для входа администратора
adminLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("admin-login-modal").style.display = "flex";
});

// Закрытие модального окна при клике вне его области
window.addEventListener("click", (e) => {
    if (e.target === document.getElementById("admin-login-modal")) {
        document.getElementById("admin-login-modal").style.display = "none";
    }
});

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    renderRecipes();
    renderRecipeOfTheDay();
});