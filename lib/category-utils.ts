export function transformCategoriesToHierarchy(categories: any[]): any[] {
    const map: Record<number, any> = {};
    const roots: any[] = [];

    categories.forEach(cat => {
        map[cat.id] = { ...cat, subcategories: [] };
    });

    categories.forEach(cat => {
        if (cat.parent_id === null) {
            roots.push(map[cat.id]);
        } else if (map[cat.parent_id]) {
            map[cat.parent_id].subcategories.push(map[cat.id]);
        }
    });

    return roots;
}
