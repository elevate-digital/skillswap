import { ProfilePicture, useAuth } from '@/lib/components'

export function Comment () {
    const { user } = useAuth();

    return (
        <div className="flex flex-col gap-[.5em]">
            <div className="flex gap-3">
                <ProfilePicture small name={user?.name || ""} />
                <p className="!font-medium pr-[.5em]">{user?.name}</p>
                <p>2 feb, 14:30</p>
            </div>
            <p>Dit is een voorbeeldcommentaar. Het toont hoe een commentaar eruit zou kunnen zien in de applicatie.</p>
            <div className="flex w-[100%] h-px bg-gray-300 mt-[.5em]" />
        </div>
    )
}