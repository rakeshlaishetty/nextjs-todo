const { NextResponse } = require("next/server");

export const ResponseMessage = (message, status, statusCode, data = null) => {
    console.log(data, "data");
    return NextResponse.json(
        { message, status, ...(data && { data }) },
        { status: statusCode }
    );
};
