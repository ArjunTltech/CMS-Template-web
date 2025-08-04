import axiosInstance from '../../config/axios';
import React, { useEffect, useState } from 'react';
import StatCard from '../ui/StatCard';
import { Mail } from 'lucide-react';
import { SkeletonCard } from '../skeleton/Skeleton';
import { dummyTotalSubscribers } from '../data/dummyStats';

const TotalSubscribers = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 500)); const result = dummyTotalSubscribers.totalSubscribers;
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full animate-fade-in-down">
            {loading ? (
                <SkeletonCard />
            ) : (
                <StatCard
                    title="Total Subscribers"
                    value={data}
                    description="Subscribed"
                    icon={Mail}
                    iconColor="text-yellow-500"
                />
            )}
        </div>
    );
};

export default TotalSubscribers;