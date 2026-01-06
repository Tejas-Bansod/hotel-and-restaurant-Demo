import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables from .env.local
config({ path: join(process.cwd(), '.env.local') });

import dbConnect from './lib/mongodb';
import Product from './models/Product';
import Admin from './models/Admin';
import bcrypt from 'bcryptjs';

const products = [
    {
        name: 'Chicken Biryani',
        description: 'Aromatic basmati rice layered with tender chicken, saffron, and traditional spices',
        price: 350,
        category: 'main-course',
        image: '/images/food/biryani.png',
        spiceLevel: 'medium',
        vegetarian: false,
        availability: true,
    },
    {
        name: 'Butter Chicken',
        description: 'Creamy tomato-based curry with tender chicken pieces and aromatic spices',
        price: 380,
        category: 'main-course',
        image: '/images/food/butter-chicken.png',
        spiceLevel: 'mild',
        vegetarian: false,
        availability: true,
    },
    {
        name: 'Samosa Platter',
        description: 'Crispy pastry filled with spiced potatoes and peas, served with chutneys',
        price: 150,
        category: 'appetizers',
        image: '/images/food/samosa.png',
        spiceLevel: 'medium',
        vegetarian: true,
        availability: true,
    },
    {
        name: 'Tandoori Platter',
        description: 'Mixed grill featuring tandoori chicken, seekh kebabs, and paneer tikka',
        price: 450,
        category: 'appetizers',
        image: '/images/food/tandoori.png',
        spiceLevel: 'hot',
        vegetarian: false,
        availability: true,
    },
    {
        name: 'Gulab Jamun',
        description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
        price: 120,
        category: 'desserts',
        image: '/images/food/gulab-jamun.png',
        vegetarian: true,
        availability: true,
    },
    {
        name: 'Masala Chai',
        description: 'Traditional Indian spiced tea with aromatic herbs and spices',
        price: 60,
        category: 'beverages',
        image: '/images/food/masala-chai.png',
        vegetarian: true,
        availability: true,
    },
    {
        name: 'Traditional Thali',
        description: 'Complete meal with dal, vegetables, rice, roti, raita, and dessert',
        price: 420,
        category: 'main-course',
        image: '/images/food/thali.png',
        spiceLevel: 'medium',
        vegetarian: true,
        availability: true,
    },
];

async function seedDatabase() {
    try {
        await dbConnect();

        console.log('🌱 Seeding database...');

        // Clear existing data
        await Product.deleteMany({});
        await Admin.deleteMany({});

        // Seed products
        const createdProducts = await Product.insertMany(products);
        console.log(`✅ Created ${createdProducts.length} products`);

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = await Admin.create({
            email: 'admin@spicehaven.com',
            password: hashedPassword,
            name: 'Admin User',
            role: 'admin',
        });
        console.log(`✅ Created admin user: ${admin.email}`);

        console.log('✨ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
