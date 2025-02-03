import { KanbanItem } from "@models/todos";

const todos: KanbanItem[] = [
  {
    "id": 0,
    "title": "Créer composant Card",
    "description": "Composant card permet d'afficher les tâches effectuer",
    "cost": 50,
    "status": "todo",
    "updateMode": false
  },
  {
    "id": 1,
    "title": "Créer la page",
    "description": "Cette page va afficher l'ensemble du projet",
    "cost": 50,
    "status": "todo",
    "updateMode": false
  },
  {
    "id": 2,
    "title": "Installer dndkit",
    "description": "Mettre en place dndkit pour le drag&drop des tâches",
    "cost": 50,
    "status": "done",
    "updateMode": false
  }
];

export default todos;