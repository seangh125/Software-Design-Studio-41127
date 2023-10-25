function createUserHomepage(username) {
    const container = document.createElement("div");
    container.classList.add("container");

    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = `Welcome, ${username}!`;
    const description = document.createElement("p");
    description.textContent = "Test your knowledge and expand your horizons.";
    header.appendChild(title);
    header.appendChild(description);

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    const homeLink = createNavLink("Home", "#");
    const test1Link = createNavLink("Knowledge Test 1", "#");
    const test2Link = createNavLink("Knowledge Test 2", "#");
    const test3Link = createNavLink("Knowledge Test 3", "#");
    const logoutLink = createNavLink("Logout", "#");

    ul.appendChild(homeLink);
    ul.appendChild(test1Link);
    ul.appendChild(test2Link);
    ul.appendChild(test3Link);
    ul.appendChild(logoutLink);

    nav.appendChild(ul);

    const main = document.createElement("main");
    const section = document.createElement("section");
    const testsHeader = document.createElement("h2");
    testsHeader.textContent = "Your Knowledge Tests:";
    const testsList = document.createElement("ul");

    const test1 = createTestLink("Sample Test 1");
    const test2 = createTestLink("Sample Test 2");
    const test3 = createTestLink("Sample Test 3");

    testsList.appendChild(test1);
    testsList.appendChild(test2);
    testsList.appendChild(test3);

    section.appendChild(testsHeader);
    section.appendChild(testsList);

    main.appendChild(section);

    container.appendChild(header);
    container.appendChild(nav);
    container.appendChild(main);

    document.body.appendChild(container);
}

function createNavLink(text, url) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = text;
    link.href = url;
    li.appendChild(link);
    return li;
}

function createTestLink(testName) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = testName;
    link.href = "#"; 
    li.appendChild(link);
    return li;
}

createUserHomepage("Example");
