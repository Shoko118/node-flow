## Node Vue Flow

A Vue.js application for creating and managing flow charts with interactive nodes and connections.

### Architecture Overview

1. **Core Technologies**

   - Vue 3 with Composition API
   - TypeScript
   - Vue Router for navigation
   - Pinia for state management
   - Vue Flow for flow chart visualization
   - Tailwind CSS for styling

2. **Component Workflow**

#### Step 1: Base Setup and Layout (`App.vue`)

- Created the main layout with header and content areas
- Implemented responsive container using Tailwind CSS
- Set up nested router views for main content and drawer

#### Step 2: State Management (`useFlowStore.ts`)

- Established Pinia store for centralized state management
- Defined core interfaces:
- Implemented key actions:
  - `initializeFlow()`: Processes initial node data
  - `addNode()`: Creates new nodes
  - `updateNode()`: Modifies existing nodes
  - `deleteNode()`: Removes nodes and their connections

#### Step 3: Flow Chart Implementation (`FlowChart.vue`)

- Integrated Vue Flow library
- Set up core flow chart functionality:
- Implemented node click handling for drawer navigation
- Added automatic view fitting and edge connection handling
- Configured custom node types and styling

#### Step 4: Custom Node Component (`CustomNode.vue`)

- Created reusable node component with:
  - Dynamic icons based on node type
  - Title and description display
  - Delete functionality
  - Handle connections for input/output

#### Step 5: Node Creation Dialog (`CreateNodeDialog.vue`)

- Implemented modal dialog for new node creation
- Added form validation
- Integrated with Pinia store for node creation

#### Step 6: Node Details Drawer (`NodeIdDrawer.vue`)

- Created slide-out drawer for node editing
- Implemented responsive design for mobile/desktop
- Added form fields for:
  - Title and description
  - File attachments
  - Comments
  - Type-specific fields
