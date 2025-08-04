import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axios';
import { SkeletonCard } from '../skeleton/Skeleton';
import StatCard from '../ui/StatCard';
import { Eye, TrendingDown } from 'lucide-react';
import { dummyTotalBounceRate } from '../data/dummyStats';

const TotalBounceRate = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
                const result = dummyTotalBounceRate.totalBounceRate
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const bounceRatePercentage = data ? `${(parseFloat(data) * 100).toFixed(2)}` : "0.00%";

    return (
        <div className="w-full animate-fade-in-down">
            {loading ? (
                <SkeletonCard />
            ) : (
                <StatCard
                    title="Total Bounce Rate"
                    value={bounceRatePercentage}
                    description="Percent in Last 30 days"
                    icon={TrendingDown}
                    iconColor="text-red-500"
                />
            )}
        </div>
    );
};

export default TotalBounceRate