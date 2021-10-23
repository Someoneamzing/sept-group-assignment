# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version)
for commit guidelines.

### 0.2.2 (2021-10-23)

### Features

-   :loud_sound: Added log4j2 and logging to the microservices
    ([8042d38](https://github.com/Someoneamzing/sept-group-assignment/commit/8042d3871ef06d44976bbd764341a64670acb274))
-   :sparkles: add 404 page to routing
    ([80f2efd](https://github.com/Someoneamzing/sept-group-assignment/commit/80f2efdb326cd9f651ceb6aeb2862e99f6d06483))
-   :sparkles: add a business user registration form, no approval from admin
    ([ff37e6a](https://github.com/Someoneamzing/sept-group-assignment/commit/ff37e6a780f0ba2ce7e240e2aedadbaacd50f8a2))
-   :sparkles: add page for listing all books (in testing state)
    ([1af3ec1](https://github.com/Someoneamzing/sept-group-assignment/commit/1af3ec1ecea54d88003a89a756aaaa534eefa824))
-   :sparkles: implement API interaction and app state for viewing books,
    implement table of contents preview
    ([007db57](https://github.com/Someoneamzing/sept-group-assignment/commit/007db57e8f3f8fd93be6794aacc6b126799b17ac))
-   :sparkles: implement frontend layout and routing for Books preview page with
    placeholder contents
    ([640d3eb](https://github.com/Someoneamzing/sept-group-assignment/commit/640d3eba7576f6f5f459933179a837769911bd5d))
-   :sparkles: implement login and fix registering
    ([2442148](https://github.com/Someoneamzing/sept-group-assignment/commit/24421488cd8af86ab72996fc77176737535d3f25))
-   :sparkles: implement login page and app state mangement
    ([673cbc0](https://github.com/Someoneamzing/sept-group-assignment/commit/673cbc0c55d4c4537aeb6619c691e19ce420b268))
-   :sparkles: implement Page for bookForSale model with api interaction and app
    state at /s/:userId/book/:bookId
    ([ff28ff4](https://github.com/Someoneamzing/sept-group-assignment/commit/ff28ff4fd67eb1aaef23bf3068980bccc8511bcc))
-   :sparkles: manage fetching and storing books state with recoil app state
    ([50800b1](https://github.com/Someoneamzing/sept-group-assignment/commit/50800b1700b85506cd0d1926a8ab0008589d0bb1))
-   :zap: allow user to filter out books by categories
    ([f52ebd8](https://github.com/Someoneamzing/sept-group-assignment/commit/f52ebd8832e87fe88158d320322c68e0ee29776f))
-   add genre field to book, create both back-end and front-end for filter page
    ([c68a623](https://github.com/Someoneamzing/sept-group-assignment/commit/c68a623ea2fb45d734dc2197a20eb04d206a3f33))
-   added form validation
    ([b91a705](https://github.com/Someoneamzing/sept-group-assignment/commit/b91a7052c5872fcc64be34de9b672720c6ce2d99))
-   **frontend:** :art: Move api calls to api.js
    ([4c931f4](https://github.com/Someoneamzing/sept-group-assignment/commit/4c931f4e218f0e67b5f5f15b544d1c236e882942))
-   **frontend:** :lipstick: Add BookForSaleForm
    ([a073efa](https://github.com/Someoneamzing/sept-group-assignment/commit/a073efab1bc416bdfb19e0a2b99b968a3131b587))
-   **frontend:** :lipstick: Add File Picker Component
    ([1282c89](https://github.com/Someoneamzing/sept-group-assignment/commit/1282c895136f3d7bda5fc9980ac3ffa6f28ef795))
-   **frontend:** :sparkles: Add cover art selection
    ([89bd0d5](https://github.com/Someoneamzing/sept-group-assignment/commit/89bd0d53c5366f293bf39d9fe28606488c979dc5))
-   **frontend:** :sparkles: Add submission logic to AddBookForm
    ([671dc8c](https://github.com/Someoneamzing/sept-group-assignment/commit/671dc8c1410e8d14a2fc0c6766d7a9bda3cfc9b5))
-   registration is working for public users
    ([598c1ff](https://github.com/Someoneamzing/sept-group-assignment/commit/598c1ff71f273b475bf56da4cf4de2cd6f7f10a3))

### Bug Fixes

-   :bug: fix conflict between env var state during frontend testing and env var
    state for dev/prod
    ([cd76c07](https://github.com/Someoneamzing/sept-group-assignment/commit/cd76c07872e35d5e57de631b8fc703f3f6177eef))
-   :bug: Fix dependency issue with Logging
    ([0aab6bc](https://github.com/Someoneamzing/sept-group-assignment/commit/0aab6bc84de7a20e07d52a86e3d1c28c6d1ec111))
-   :bug: fix form validation bug
    ([017a054](https://github.com/Someoneamzing/sept-group-assignment/commit/017a054aec2c850a47cdbb05c986abf10ea82d35))
-   :bug: fix username must be unique test
    ([02c15b3](https://github.com/Someoneamzing/sept-group-assignment/commit/02c15b35c21abebcfc701423a229df94d71c8875))
-   :white_check_mark: fix tests after merge
    ([538aa91](https://github.com/Someoneamzing/sept-group-assignment/commit/538aa9119e1fa68b5ed596a6af56b736e3d66251))
-   **backend_books:** :bug: Enable CORS for frontend
    ([75411d3](https://github.com/Someoneamzing/sept-group-assignment/commit/75411d32ec5ab9455a605aff48adacbb8f8b6ed3))
-   **backend_books:** :bug: Fix coverArtURL being too small
    ([cef48e2](https://github.com/Someoneamzing/sept-group-assignment/commit/cef48e2a0c10cea92f85e3fef1e11a8e597cc9a7))
-   **backend_books:** :lock: Enable CORS
    ([ea50975](https://github.com/Someoneamzing/sept-group-assignment/commit/ea509753b48fbdf06cc286265c349dd0d3cf91b0))
-   **frontend:** :bug: Allow only image files for boo cover
    ([3a3b4ec](https://github.com/Someoneamzing/sept-group-assignment/commit/3a3b4ec93cbff3a18b6f76a46e5e6719353c0dd5))
-   **frontend:** :bug: Fix import errors
    ([cf17c3d](https://github.com/Someoneamzing/sept-group-assignment/commit/cf17c3d3b429d41d32698298642e09be3b680272))
-   **frontend:** :bug: Fixed BookField not opening on focus
    ([fb9e18c](https://github.com/Someoneamzing/sept-group-assignment/commit/fb9e18c70b7e2e4032437c65cd350574fc121377))

### 0.1.2-alpha.1 (2021-10-04)

### Features

-   :sparkles: add 404 page to routing
    ([80f2efd](https://github.com/Someoneamzing/sept-group-assignment/commit/80f2efdb326cd9f651ceb6aeb2862e99f6d06483))
-   :sparkles: add a business user registration form, no approval from admin
    ([ff37e6a](https://github.com/Someoneamzing/sept-group-assignment/commit/ff37e6a780f0ba2ce7e240e2aedadbaacd50f8a2))
-   :sparkles: add page for listing all books (in testing state)
    ([1af3ec1](https://github.com/Someoneamzing/sept-group-assignment/commit/1af3ec1ecea54d88003a89a756aaaa534eefa824))
-   :sparkles: implement API interaction and app state for viewing books,
    implement table of contents preview
    ([007db57](https://github.com/Someoneamzing/sept-group-assignment/commit/007db57e8f3f8fd93be6794aacc6b126799b17ac))
-   :sparkles: implement frontend layout and routing for Books preview page with
    placeholder contents
    ([640d3eb](https://github.com/Someoneamzing/sept-group-assignment/commit/640d3eba7576f6f5f459933179a837769911bd5d))
-   :sparkles: implement login and fix registering
    ([2442148](https://github.com/Someoneamzing/sept-group-assignment/commit/24421488cd8af86ab72996fc77176737535d3f25))
-   :sparkles: implement login page and app state mangement
    ([673cbc0](https://github.com/Someoneamzing/sept-group-assignment/commit/673cbc0c55d4c4537aeb6619c691e19ce420b268))
-   :sparkles: implement Page for bookForSale model with api interaction and app
    state at /s/:userId/book/:bookId
    ([ff28ff4](https://github.com/Someoneamzing/sept-group-assignment/commit/ff28ff4fd67eb1aaef23bf3068980bccc8511bcc))
-   :sparkles: manage fetching and storing books state with recoil app state
    ([50800b1](https://github.com/Someoneamzing/sept-group-assignment/commit/50800b1700b85506cd0d1926a8ab0008589d0bb1))
-   added form validation
    ([b91a705](https://github.com/Someoneamzing/sept-group-assignment/commit/b91a7052c5872fcc64be34de9b672720c6ce2d99))
-   **frontend:** :art: Move api calls to api.js
    ([4c931f4](https://github.com/Someoneamzing/sept-group-assignment/commit/4c931f4e218f0e67b5f5f15b544d1c236e882942))
-   **frontend:** :lipstick: Add BookForSaleForm
    ([a073efa](https://github.com/Someoneamzing/sept-group-assignment/commit/a073efab1bc416bdfb19e0a2b99b968a3131b587))
-   **frontend:** :lipstick: Add File Picker Component
    ([1282c89](https://github.com/Someoneamzing/sept-group-assignment/commit/1282c895136f3d7bda5fc9980ac3ffa6f28ef795))
-   **frontend:** :sparkles: Add cover art selection
    ([89bd0d5](https://github.com/Someoneamzing/sept-group-assignment/commit/89bd0d53c5366f293bf39d9fe28606488c979dc5))
-   **frontend:** :sparkles: Add submission logic to AddBookForm
    ([671dc8c](https://github.com/Someoneamzing/sept-group-assignment/commit/671dc8c1410e8d14a2fc0c6766d7a9bda3cfc9b5))
-   registration is working for public users
    ([598c1ff](https://github.com/Someoneamzing/sept-group-assignment/commit/598c1ff71f273b475bf56da4cf4de2cd6f7f10a3))

### Bug Fixes

-   :bug: fix conflict between env var state during frontend testing and env var
    state for dev/prod
    ([cd76c07](https://github.com/Someoneamzing/sept-group-assignment/commit/cd76c07872e35d5e57de631b8fc703f3f6177eef))
-   :bug: fix form validation bug
    ([017a054](https://github.com/Someoneamzing/sept-group-assignment/commit/017a054aec2c850a47cdbb05c986abf10ea82d35))
-   :bug: fix username must be unique test
    ([02c15b3](https://github.com/Someoneamzing/sept-group-assignment/commit/02c15b35c21abebcfc701423a229df94d71c8875))
-   :white_check_mark: fix tests after merge
    ([538aa91](https://github.com/Someoneamzing/sept-group-assignment/commit/538aa9119e1fa68b5ed596a6af56b736e3d66251))
-   **backend_books:** :bug: Enable CORS for frontend
    ([75411d3](https://github.com/Someoneamzing/sept-group-assignment/commit/75411d32ec5ab9455a605aff48adacbb8f8b6ed3))
-   **backend_books:** :bug: Fix coverArtURL being too small
    ([cef48e2](https://github.com/Someoneamzing/sept-group-assignment/commit/cef48e2a0c10cea92f85e3fef1e11a8e597cc9a7))
-   **backend_books:** :lock: Enable CORS
    ([ea50975](https://github.com/Someoneamzing/sept-group-assignment/commit/ea509753b48fbdf06cc286265c349dd0d3cf91b0))
-   **frontend:** :bug: Allow only image files for boo cover
    ([3a3b4ec](https://github.com/Someoneamzing/sept-group-assignment/commit/3a3b4ec93cbff3a18b6f76a46e5e6719353c0dd5))
-   **frontend:** :bug: Fix import errors
    ([cf17c3d](https://github.com/Someoneamzing/sept-group-assignment/commit/cf17c3d3b429d41d32698298642e09be3b680272))
-   **frontend:** :bug: Fixed BookField not opening on focus
    ([fb9e18c](https://github.com/Someoneamzing/sept-group-assignment/commit/fb9e18c70b7e2e4032437c65cd350574fc121377))
