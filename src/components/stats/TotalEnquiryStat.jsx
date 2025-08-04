import React, { useEffect, useState } from 'react';
import StatCard from '../ui/StatCard';
import { Clipboard } from 'lucide-react';
import axiosInstance from '../../config/axios';
import { SkeletonCard } from '../skeleton/Skeleton';
import { dummyTotalEnquiry } from '../data/dummyStats';

const TotalEnquiryStat = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
                const result = dummyTotalEnquiry.totalEnquiry;
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
        <div className="w-full  animate-fade-in-down">
            {loading ? (
                <SkeletonCard />
            ) : (
                <StatCard
                    title="Total Enquiries"
                    value={data}
                    description="Received"
                    icon={Clipboard}
                    iconColor="text-blue-500"
                />
            )}
        </div>
    );
};

export default TotalEnquiryStat;
