import Database from 'better-sqlite3';
import { mkdirp } from 'mkdirp';

mkdirp.sync('./data');
const db = new Database('./data/inventory.db');

// Agregar después de crear la tabla products
db.prepare(`
    CREATE TABLE IF NOT EXISTS drinks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL UNIQUE,
      price INT NOT NULL
    )`).run();
    
db.prepare(`
    CREATE TABLE IF NOT EXISTS drink_craft (
      product_id INT NOT NULL,
      drink_id INT NOT NULL,
      product_quantity INT NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      FOREIGN KEY (drink_id) REFERENCES drinks(id) ON DELETE CASCADE
    )`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS register (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        drink_id INTEGER NOT NULL,
        bought_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (drink_id) REFERENCES drinks(id) ON DELETE CASCADE
    )`).run();
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(64) NOT NULL
    )`).run();
    // Crear índices para mejor performance
db.prepare('CREATE INDEX IF NOT EXISTS idx_drink_craft_drink ON drink_craft(drink_id)').run();

export default db;