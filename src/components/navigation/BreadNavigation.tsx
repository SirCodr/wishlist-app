import { useLocation } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../ui/breadcrumb'
import React from 'react'

const BreadNavigation = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  function formatBreadcrumb(str: string) {
    return str.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  }

  if (!pathnames || pathnames.length <= 1) return <></>

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1

          if (isLast)
            return (
              <BreadcrumbItem key={value + index}>
                <BreadcrumbPage>{formatBreadcrumb(value)}</BreadcrumbPage>
              </BreadcrumbItem>
            )

          return (
            <React.Fragment key={value + index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={to}>
                  {formatBreadcrumb(value)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadNavigation
