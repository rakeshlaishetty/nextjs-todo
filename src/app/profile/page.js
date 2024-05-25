async function takeTime() {
    await new Promise((resvole) => {
      setTimeout(resvole, 3000);
    });
  }
  
  export default async function Profile() {
    await takeTime();
    // throw new Error("this is manual error");
    return (
      <div>
        <h1>This is Profile page</h1>
      </div>
    );
  }
  