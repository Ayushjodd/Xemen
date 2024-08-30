export const ProfileSkeleton = () => {
    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto animate-pulse">
                    <div className="w-full h-12 bg-gray-200 rounded-lg dark:bg-gray-700 mb-6"></div>

                    <div className="flex flex-col items-center justify-center mb-7 overflow-hidden h-screen">
                        <div className="flex flex-col items-center">
                            <div className="w-48 h-6 bg-gray-200 rounded-lg dark:bg-gray-700 mb-4"></div> {/* Profile Heading Skeleton */}
                        </div>
                        <div className="flex flex-col border bg-gray-50 shadow-lg rounded-lg px-6 py-5 w-[60%] my-4 gap-5 relative">
                            <div className="w-full h-6 bg-gray-200 rounded-lg dark:bg-gray-700 mb-4"></div> {/* Name Skeleton */}
                            <div className="w-full h-4 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2"></div> {/* Email Skeleton */}
                            <div className="w-full h-4 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2"></div> {/* Name Skeleton */}
                            <div className="w-full h-4 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2"></div> {/* Provider Skeleton */}
                            <div className="w-full h-4 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2"></div> {/* Created At Skeleton */}
                            <div className="w-full h-4 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2"></div> {/* Orders Created Skeleton */}
                            <div className="w-full h-4 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2"></div> {/* Products Listed Skeleton */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
