enum PermissionType {
    image = "image",
    file = "file",
    text = "text",
}

enum PermissionAction {
    view = "view",
    upload = "upload",
    list = "list",
    delete = "delete",
}

export type PermissionsTree = {
    [key in PermissionType]: { [type in PermissionAction]: boolean };
};
