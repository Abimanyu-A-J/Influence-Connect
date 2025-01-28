import { DashboardLayout } from '../../components/dashboard/DashboardLayout';

export function DashboardPage() {
  const userType = 'influencer'; // Replace with actual user type from auth
  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        {userType === 'influencer' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">Active Applications</h2>
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">Recent Campaigns</h2>
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Compaign Name
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Company Name
                      </p>
                    </div>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">Active Campaigns</h2>
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $320
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium">Recent Applications</h2>
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}