'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import {
    FiPackage,
    FiShoppingBag,
    FiUsers,
    FiDollarSign,
    FiLogOut,
    FiRefreshCw,
} from 'react-icons/fi';
import Button from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AdminDashboard: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

    // Redirect if not authenticated
    React.useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    // Fetch data
    const { data: productsData, mutate: mutateProducts } = useSWR('/api/products', fetcher);
    const { data: ordersData, mutate: mutateOrders } = useSWR('/api/orders', fetcher);

    const products = productsData?.data || [];
    const orders = ordersData?.data || [];

    // Calculate stats
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
    const pendingOrders = orders.filter((order: any) => order.status === 'pending').length;

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        setUpdatingOrder(orderId);
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                mutateOrders();
            } else {
                alert('Failed to update order status');
            }
        } catch (error) {
            alert('Error updating order status');
        } finally {
            setUpdatingOrder(null);
        }
    };

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: '/admin/login' });
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[var(--color-saffron)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[var(--color-gray)]">Loading...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[var(--color-light-gray)]">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="container-custom py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--color-dark)] font-[var(--font-heading)]">
                            Admin Dashboard
                        </h1>
                        <p className="text-sm text-[var(--color-gray)] font-[var(--font-body)]">
                            Welcome back, {session.user?.email}
                        </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout} icon={<FiLogOut />}>
                        Logout
                    </Button>
                </div>
            </header>

            <div className="container-custom py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<FiShoppingBag />}
                        title="Total Orders"
                        value={totalOrders}
                        color="blue"
                    />
                    <StatCard
                        icon={<FiPackage />}
                        title="Menu Items"
                        value={totalProducts}
                        color="green"
                    />
                    <StatCard
                        icon={<FiUsers />}
                        title="Pending Orders"
                        value={pendingOrders}
                        color="orange"
                    />
                    <StatCard
                        icon={<FiDollarSign />}
                        title="Total Revenue"
                        value={formatCurrency(totalRevenue)}
                        color="purple"
                    />
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-[var(--color-dark)] font-[var(--font-heading)]">
                            Recent Orders
                        </h2>
                        <Button
                            variant="outline"
                            size="sm"
                            icon={<FiRefreshCw />}
                            onClick={() => mutateOrders()}
                        >
                            Refresh
                        </Button>
                    </div>

                    {orders.length === 0 ? (
                        <p className="text-center text-[var(--color-gray)] py-8">No orders yet</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-semibold text-sm text-[var(--color-dark)]">
                                            Order ID
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm text-[var(--color-dark)]">
                                            Customer
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm text-[var(--color-dark)]">
                                            Items
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm text-[var(--color-dark)]">
                                            Total
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm text-[var(--color-dark)]">
                                            Status
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm text-[var(--color-dark)]">
                                            Date
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm text-[var(--color-dark)]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order: any) => (
                                        <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm font-mono">
                                                #{order._id.slice(-6)}
                                            </td>
                                            <td className="py-3 px-4 text-sm">{order.customerName}</td>
                                            <td className="py-3 px-4 text-sm">{order.items.length} items</td>
                                            <td className="py-3 px-4 text-sm font-semibold">
                                                {formatCurrency(order.totalAmount)}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : order.status === 'confirmed'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : order.status === 'preparing'
                                                                    ? 'bg-purple-100 text-purple-800'
                                                                    : order.status === 'ready'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : order.status === 'delivered'
                                                                            ? 'bg-gray-100 text-gray-800'
                                                                            : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-[var(--color-gray)]">
                                                {formatDate(order.createdAt)}
                                            </td>
                                            <td className="py-3 px-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                    disabled={updatingOrder === order._id}
                                                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="preparing">Preparing</option>
                                                    <option value="ready">Ready</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Products List */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-[var(--color-dark)] font-[var(--font-heading)]">
                            Menu Items
                        </h2>
                        <Button
                            variant="outline"
                            size="sm"
                            icon={<FiRefreshCw />}
                            onClick={() => mutateProducts()}
                        >
                            Refresh
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product: any) => (
                            <div
                                key={product._id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-[var(--color-dark)]">{product.name}</h3>
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${product.availability
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {product.availability ? 'Available' : 'Unavailable'}
                                    </span>
                                </div>
                                <p className="text-sm text-[var(--color-gray)] mb-2">{product.category}</p>
                                <p className="text-lg font-bold text-[var(--color-saffron)]">
                                    {formatCurrency(product.price)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Stat Card Component
const StatCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: string | number;
    color: 'blue' | 'green' | 'orange' | 'purple';
}> = ({ icon, title, value, color }) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        orange: 'bg-orange-100 text-orange-600',
        purple: 'bg-purple-100 text-purple-600',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
                    <div className="text-xl">{icon}</div>
                </div>
            </div>
            <h3 className="text-sm font-medium text-[var(--color-gray)] mb-1">{title}</h3>
            <p className="text-2xl font-bold text-[var(--color-dark)]">{value}</p>
        </motion.div>
    );
};

export default AdminDashboard;
