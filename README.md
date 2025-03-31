# LJB Todo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Development server

To start a local development server, run:

```bash
npm install
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Rquirements Checklist

### Primary requirements
- [x] A Task should consist of a title
- [x] Users should be able to access the app via a browser
- [x] Tasks should display as a list
- [x] Task state should persist between page reloads (we do not need to manage state for multiple different users, no auth is required)
- [x] Users can create new tasks
- [x] Users can mark tasks as complete or incomplete
### Secondary requirements
- [x] Allow the user to edit tasks
- [x] Allow the user to delete tasks
- [x] Allow the user to add a description to the task
- [x] Allow the user to reorder tasks (Used Drag Drop)

### UI Considerations
- Responsive, will work on mobile and desktop sized screens.
- Using ngrx the state is maintained accross all components

### extras
- The app will also sync across tabs, I have never used this before, but it seems to work well, please see broadcast-sync.service.ts
- The app is setup as a PWA so can be 'installed'.
- While completely redundant the home component is lazy loaded

### Notable libs used
- @angular/material
- @ngrx/store
- @angular/service-worker