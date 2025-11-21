import axiosInstance from "./axios/axiosInstance";

// ------Roles Permissions------
export const getUserPermissions = async () => {
  const res = await axiosInstance.get("/role_permissions");
  return res.data;
};

export const getPermissions = async () => {
  const res = await axiosInstance.get("/permissions")
  return res.data;
}

export const createRole = async (payload: any) => {
  const res = await axiosInstance.post("/role_permissions", payload)
  return res.data;
}

export const updateRole = async (id: string | number, payload: any) => {
  const res = await axiosInstance.patch(`/role_permissions/${id}`, payload);
  return res.data;
}

export const getRoleById = async (id: string | number) => {
  const res = await axiosInstance.get(`/role_permissions/${id}`);
  return res.data;
}

// ------Categories------
export const getCategories = async (params?: {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  search?: string;
}) => {
  const res = await axiosInstance.get("/categories", { params });
  return res.data;
};

export const createCategory = async (payload: any) => {
  const res = await axiosInstance.post("/categories", payload)
  return res.data;
}

export const updateCategory = async (id: string | number, payload: any) => {
  const res = await axiosInstance.put(`/categories/${id}`, payload);
  return res.data;
}

export const deleteCategory = async (id: any) => {
  const res = await axiosInstance.delete(`/categories/${id}`);
  return res.data;
}

// ------Knowledge Base------
export const getKnowledgeBase = async (params?: {
  exclusiveStartKey?: string;
  limit?: number;
}) => {
  const res = await axiosInstance.get("/knowledge-base", { params });
  return res.data;
};


export const updateKnowledgeBase = async (id: string | number, payload: any) => {
  const res = await axiosInstance.patch(`/knowledge-base/${id}`, payload);
  return res.data;
}

export const deleteKnowledgeBase = async (id: any) => {
  const res = await axiosInstance.delete(`/knowledge-base/${id}`);
  return res.data;
}


// ------Blog------
export const getBlogs = async (params?: {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}) => {
  const res = await axiosInstance.get("/blogs", { params });
  return res.data;
};

export const getBlogById = async (params?: {
  id?: string;
}) => {
  const res = await axiosInstance.get("/blogs", { params });
  return res.data;
};

export const createBlog = async (payload: any) => {
  const res = await axiosInstance.post("/blogs", payload)
  return res.data;
}

export const updateBlog = async (id: string | number, payload: any) => {
  const res = await axiosInstance.put(`/blogs/${id}`, payload);
  return res.data;
}

export const deleteBlog = async (id: any) => {
  const res = await axiosInstance.delete(`/blogs/${id}`);
  return res.data;
}

// media library
export const getMediaLibrary = async (params?: {
  exclusiveStartKey?: string;
  limit?: number;
}) => {
  const res = await axiosInstance.get("/media-library", { params });
  return res.data;
};

export const createMediaLibrary = async (payload: any) => {
  const res = await axiosInstance.post("/media-library", payload)
  return res.data;
}

export const updateMediaLibrary = async (id: string | number, payload: any) => {
  const res = await axiosInstance.put(`/media-library/${id}`, payload);
  return res.data;
}

export const deleteMediaLibrary = async (id: any) => {
  const res = await axiosInstance.delete(`/media-library/${id}`);
  return res.data;
}

// industries
export const getIndustries = async () => {
  const res = await axiosInstance.get("/industry/names");
  return res.data;
};


// -----products-----
export const getProductsName = async () => {
  const res = await axiosInstance.get("/products/product-names");
  return res.data;
};
