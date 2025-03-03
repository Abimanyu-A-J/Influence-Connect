// ListItem.js
import React from 'react';

export function ListItem({ item, type }) {
    return (
        <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {type === 'application' ? item.name : item.Name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {type === 'application' ? item.email : item.Company_name}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {type === 'application' ? item.views : `$${item.budget}`}
                </div>
            </div>
        </li> 
    );
}