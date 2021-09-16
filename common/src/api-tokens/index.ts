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

export class Permission {
    public static create(
        type: PermissionType,
        action: PermissionAction
    ): string {
        return `${type}:${action}`;
    }
}

export const getPermissions = () => {
    let permissions = [];

    for (let type in PermissionType) {
        for (let action in PermissionAction) {
            permissions.push(`${type}:${action}`);
        }
    }

    return permissions;
};

export const isPermission = (x: any): x is Permission => {
    if (typeof x !== "string") {
        return false;
    }

    const keys = x.split(":");

    if (keys.length !== 2) {
        return false;
    }

    return keys[0] in PermissionType && keys[1] in PermissionAction;
};
