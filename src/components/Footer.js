const Footer = () => {
    return (
        <footer className="h-34 bg-blue-500 mt-2">
            <div className="flex justify-around items-center">
                <div className="text-center flex-col justify-center">
                    <h3 className="text-lg font-semibold">Task Manager</h3>
                    <p>Task Manager Paragraph Task Manager Paragraph Task Manager Paragraph Task Manager Paragraph </p>
                </div>
                <div className="text-center">
                    <ul>
                        <li><a href="/">Facenook</a></li>
                        <li><a href="/">Instagram</a></li>
                        <li><a href="/">X</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;