import Category from "../models/category.js";
//
const insertTree = async (node, parentId = null) => {
  const category = new Category({
    label: node.label,
    icon: node.icon || "",
    parentId: parentId,
  });
  const saved = await category.save();

  if (node.items && node.items.length) {
    for (const child of node.items) {
      await insertTree(child, saved._id); // Recursively insert children
    }
  }
};

//create menus
export const createCategory = async (req, res) => {
  try {
    const data = req.body; // should be an array of top-level categories
    for (const category of data) {
      await insertTree(category);
    }
    res
      .status(201)
      .json({ message: "Nested categories inserted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Insert failed", error: err.message });
  }
};

//get all menus
const buildTree = (Category, parentId = null) => {
  return Category.filter(
    (cat) => String(cat.parentId) === String(parentId)
  ).map((cat) => ({
    _id: cat._id,
    label: cat.label,
    icon: cat.icon,
    items: buildTree(Category, cat._id),
  }));
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // <-- Do NOT overwrite the model name
    const tree = buildTree(categories);
    res.status(200).json(tree);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};
//update menus
export const updateCatagories = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { label, icon, parentId } = req.body;
    const updatedmenu = await Category.findByIdAndUpdate(
      id,
      {
        label,
        icon,
        parentId,
      },
      { new: true }
    );
    res.status(200).json({ msg: "Menu Updated", data: updatedmenu });
  } catch {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
