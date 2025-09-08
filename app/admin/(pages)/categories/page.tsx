import React, {Suspense} from 'react';
import CategoriesList from "@/components/categories/CategoriesList";

function Page() {
    return (
        <Suspense fallback={'Loading categories...'}>
            <CategoriesList/>
        </Suspense>
    );
}

export default Page;
