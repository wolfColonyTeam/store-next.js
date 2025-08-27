import React, {Suspense} from 'react';
import Categories from "@/components/categories/Categories";

function Page() {
    return (
        <Suspense fallback={'Loading categories...'}>
            <Categories/>
        </Suspense>
    );
}

export default Page;