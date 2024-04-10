interface Props {
    title: string,
    children: any
    icon: any
}

export function HeaderResultTypeHome(props: Props) {
    return (
        <div className="flex gap-4 w-full pb-4 justify-between items-center min-w-full">
            <div className="flex gap-4 items-center">
              {props.icon}
              <p className="text-sm">{props.title}</p>
            </div>

            <div>
                {props.children}
            </div>

          </div>
    )
}