type BadgeProps = {
    color: string
    label?: string
}

const Badge = ({ color, label }: BadgeProps) => {
    return (
        <span
            className="flex w-[75px] justify-center rounded-md p-1 text-center text-xs font-medium text-white"
            style={{ backgroundColor: color }}
        >
            {label}
        </span>
    )
}

export default Badge
