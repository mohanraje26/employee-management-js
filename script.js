
let employees = [];

async function getEmployees() {

    const loadingMessage =
        document.getElementById("loadingMessage");

    const errorMessage =
        document.getElementById("errorMessage");

    loadingMessage.style.display = "block";
    errorMessage.style.display = "none";

    try {

        const response =
            await fetch("https://dummyjson.com/users");

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }

        const data =
            await response.json();

        employees = data.users;

        displayEmployees(employees);

    } catch (error) {

        console.error("Failed to load employees:", error);

        errorMessage.textContent =
            "Failed to load employees. Please try again.";

        errorMessage.style.display = "block";

    } finally {

        loadingMessage.style.display = "none";
    }
}

function displayEmployees(employees) {

    const container =
        document.getElementById("employeeContainer");

    container.innerHTML = "";
	
	 if (employees.length === 0) {

        container.textContent =
            "No employees found.";

        return;
    }

    employees.forEach(function(employee) {

        const div =
            document.createElement("div");

        div.innerHTML = `
    <p>
        ${employee.id} -
        ${employee.firstName} ${employee.lastName} -
        ${employee.company?.department || "Unknown"} -
        ${employee.company?.title || "Unknown"}

        <button
            class="edit-button"
            data-id="${employee.id}">
            Edit
        </button>

        <button
            class="delete-button"
            data-id="${employee.id}">
            Delete
        </button>
    </p>
`;
container.appendChild(div);

	});
	
	//edit button even listener
	const editButtons =
    document.querySelectorAll(".edit-button");

editButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const id =
            button.dataset.id;

        const employee =
            employees.find(function(employee) {

                return employee.id == id;
            });

        document.getElementById("editEmployeeId").value =
            employee.id;

        document.getElementById("editEmployeeName").value =
            employee.firstName;

        document.getElementById("editEmployeeDepartment").value =
            employee.company?.department || "";

        document.getElementById("editEmployeeRole").value =
            employee.company?.title || "";
    });
});
	

    const deleteButtons =
    document.querySelectorAll(".delete-button");


    deleteButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const id = button.dataset.id;

            console.log("Delete employee:", id);
			  deleteEmployee(id);

        });

    });
}

//Create Employee 
const addButton =
    document.getElementById("addEmployee");

addButton.addEventListener("click", createEmployee);

//Display Employee 

const button =
    document.getElementById("loadEmployees");

button.addEventListener("click", async function () {

    await getEmployees();

});

//Update Employee
const updateButton =
    document.getElementById("updateEmployee");

updateButton.addEventListener("click", updateEmployee);


async function createEmployee() {

    const name =
        document.getElementById("employeeName").value.trim();

    const department =
        document.getElementById("employeeDepartment").value.trim();

    const role =
        document.getElementById("employeeRole").value.trim();


    // Form validation
    if (name === "" || department === "" || role === "") {

        alert("Please fill all employee details.");

        return;
    }


    const employee = {

        firstName: name,
        lastName: "",

        company: {
            department: department,
            title: role
        }

    };


    const response =
        await fetch(
            "https://dummyjson.com/users/add",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(employee)
            }
        );


    if (!response.ok) {

        throw new Error(
            `HTTP Error: ${response.status}`
        );

    }


    const data =
        await response.json();

    console.log("Created employee:", data);

    employees.push(data);

    displayEmployees(employees);
}


async function updateEmployee() {

    const id =
        document.getElementById("editEmployeeId").value;

    const name =
        document.getElementById("editEmployeeName").value.trim();

    const department =
        document.getElementById("editEmployeeDepartment").value.trim();

    const role =
        document.getElementById("editEmployeeRole").value.trim();


    if (name === "" || department === "" || role === "") {

        alert("Please fill all employee details.");

        return;
    }


    const employee = {

        firstName: name,
        lastName: "",

        company: {
            department: department,
            title: role
        }
    };


    const response =
        await fetch(
            `https://dummyjson.com/users/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(employee)
            }
        );


    if (!response.ok) {

        throw new Error(
            `HTTP Error: ${response.status}`
        );
    }


    const data =
        await response.json();
		
		
employees =
    employees.map(function(employee) {

        if (employee.id == id) {
            return data;
        }

        return employee;
    });
	
	displayEmployees(employees);

    console.log("Updated employee:", data);
}

async function deleteEmployee(id) {

    const response =
        await fetch(
            `https://dummyjson.com/users/${id}`,
            {
                method: "DELETE"
            }
        );


    if (!response.ok) {

        throw new Error(
            `HTTP Error: ${response.status}`
        );

    }


    const data =
        await response.json();


    console.log("Deleted employee:", data);


    employees = employees.filter(function(employee) {

        return employee.id != id;

    });


    displayEmployees(employees);
}

//Search employee


const searchInput =
    document.getElementById("searchEmployee");

searchInput.addEventListener("input", function() {

    applyFilters();

});

//Display selected employee

const departmentFilter =
    document.getElementById("departmentFilter");

departmentFilter.addEventListener("change", function() {

    applyFilters();

});

// Filter and search results
function applyFilters() {

    const searchText =
        document.getElementById("searchEmployee").value
            .trim()
            .toLowerCase();

    const selectedDepartment =
        document.getElementById("departmentFilter").value;

    const filteredEmployees =
        employees.filter(function(employee) {

            const fullName =
                `${employee.firstName} ${employee.lastName}`
                    .toLowerCase();

            const department =
                employee.company?.department;

            const matchesSearch =
                fullName.includes(searchText);

            const matchesDepartment =
                selectedDepartment === "All Departments" ||
                department === selectedDepartment;

            return matchesSearch && matchesDepartment;
        });

    displayEmployees(filteredEmployees);
}

//Sort fuctions

const sortEmployees =
    document.getElementById("sortEmployees");

sortEmployees.addEventListener("change", function() {

    const sortType =
        sortEmployees.value;

    if (sortType === "none") {

        applyFilters();

        return;
    }

    const sortedEmployees =
        [...employees].sort(function(a, b) {

            const nameA =
                `${a.firstName} ${a.lastName}`.toLowerCase();

            const nameB =
                `${b.firstName} ${b.lastName}`.toLowerCase();

            if (sortType === "nameAsc") {
                return nameA.localeCompare(nameB);
            }

            if (sortType === "nameDesc") {
                return nameB.localeCompare(nameA);
            }
        });

    displayEmployees(sortedEmployees);
});