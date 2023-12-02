# Admin-Dashboard

This repository is a part of Coding Assignment for Frontend Internship at *HireQuotient*.

Vercel Deployment Link: [Click here](https://admin-dashboard-harshbardolia01.vercel.app/)

Admin Dashboard is an interface for admins to see and delete users. The users were provided by an API. This project deals with building the UI for the dashboard.

## Table of Contents
- [Features](#features)
- [Clone the Repository](#clone-the-repository)
- [Install Dependencies](#install-dependencies)
- [Run The Server](#run-the-server)

### Features

1. Column titles must stand out from the entries.

2. Admin can edit or delete rows in place.(Edit and delete will only happen in memory.)

3. Pagination is implemented
    - Each page contains 10 rows. 
    - Buttons at the bottom allow you to jump to any page including special buttons for first page, previous page, next page and last page. 
    - Pagination updates based on search/filtering. If there are 25 records for example that match a search query, then pagination buttons should only go till 3.

4. Admin can select one or more rows. A selected row is highlighted with a blue-ish background color. Multiple selected rows can be deleted at once using the 'Delete Selected' button at the top right bin icon.

5. Checkbox on the top left is a shortcut to select or deselect all displayed rows. This applies to the ten rows displayed in the current page, and not all 50 rows.

6. There is a search bar that can filter on any property. Search box placeholder text starts with Search.

7. On clicking edit action in a row, it is editable in the row itself.

### Clone the Repository

```bash
git https://github.com/HarshBardolia01/Admin-Dashboard.git
cd Admin-Dashboard/code
```

### Install Dependencies:
```bash
npm install
```

### Run the Server:
```bash
npm start
```

## Contributing
Contributions are welcome! If you find any bugs or want to enhance the app, feel free to open issues or submit pull requests. Please make sure to follow the coding standards and guidelines.

Happy coding! If you have any questions or need assistance, don't hesitate to reach out.

#### Maintainer: Harsh Bardolia
#### Contact: harshbardolia02@gmail.com