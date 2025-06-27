
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ExternalLink, CheckCircle, XCircle, Cable, Sparkles } from 'lucide-react';

const Connectors = () => {
  const connectedPlatforms = [
    {
      id: 1,
      name: 'Meta',
      status: 'connected',
      link: 'https://business.facebook.com',
      image: 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjg3LjU2IDE5MSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMwMDgxZmI7fS5jbHMtMntmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50KTt9LmNscy0ze2ZpbGw6dXJsKCNsaW5lYXItZ3JhZGllbnQtMik7fTwvc3R5bGU+PGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHgxPSI2Mi4zNCIgeTE9IjEwMS40NSIgeDI9IjI2MC4zNCIgeTI9IjkxLjQ1IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIC0xLCAwLCAxOTIpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDA2NGUxIi8+PHN0b3Agb2Zmc2V0PSIwLjQiIHN0b3AtY29sb3I9IiMwMDY0ZTEiLz48c3RvcCBvZmZzZXQ9IjAuODMiIHN0b3AtY29sb3I9IiMwMDczZWUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDgyZmIiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50LTIiIHgxPSI0MS40MiIgeTE9IjUzIiB4Mj0iNDEuNDIiIHkyPSIxMjYiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgLTEsIDAsIDE5MikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMDgyZmIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDY0ZTAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48dGl0bGU+ZmFjZWJvb2stbWV0YTwvdGl0bGU+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMzEuMDYsMTI2YzAsMTEsMi40MSwxOS40MSw1LjU2LDI0LjUxQTE5LDE5LDAsMCwwLDUzLjE5LDE2MGM4LjEsMCwxNS41MS0yLDI5Ljc5LTIxLjc2LDExLjQ0LTE1LjgzLDI0LjkyLTM4LDM0LTUybDE1LjM2LTIzLjZjMTAuNjctMTYuMzksMjMtMzQuNjEsMzcuMTgtNDdDMTgxLjA3LDUuNiwxOTMuNTQsMCwyMDYuMDksMGMyMS4wNywwLDQxLjE0LDEyLjIxLDU2LjUsMzUuMTEsMTYuODEsMjUuMDgsMjUsNTYuNjcsMjUsODkuMjcsMCwxOS4zOC0zLjgyLDMzLjYyLTEwLjMyLDQ0Ljg3QzI3MSwxODAuMTMsMjU4LjcyLDE5MSwyMzguMTMsMTkxVjE2MGMxNy42MywwLDIyLTE2LjIsMjItMzQuNzQsMC0yNi40Mi02LjE2LTU1Ljc0LTE5LjczLTc2LjY5LTkuNjMtMTQuODYtMjIuMTEtMjMuOTQtMzUuODQtMjMuOTQtMTQuODUsMC0yNi44LDExLjItNDAuMjMsMzEuMTctNy4xNCwxMC42MS0xNC40NywyMy41NC0yMi43LDM4LjEzbC05LjA2LDE2Yy0xOC4yLDMyLjI3LTIyLjgxLDM5LjYyLTMxLjkxLDUxLjc1Qzg0Ljc0LDE4Myw3MS4xMiwxOTEsNTMuMTksMTkxYy0yMS4yNywwLTM0LjcyLTkuMjEtNDMtMjMuMDlDMy4zNCwxNTYuNiwwLDE0MS43NiwwLDEyNC44NVoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yNC40OSwzNy4zQzM4LjczLDE1LjM1LDU5LjI4LDAsODIuODUsMGMxMy42NSwwLDI3LjIyLDQsNDEuMzksMTUuNjEsMTUuNSwxMi42NSwzMiwzMy40OCw1Mi42Myw2Ny44MWw3LjM5LDEyLjMyYzE3Ljg0LDI5LjcyLDI4LDQ1LDMzLjkzLDUyLjIyLDcuNjQsOS4yNiwxMywxMiwxOS45NCwxMiwxNy42MywwLDIyLTE2LjIsMjItMzQuNzRsMjcuNC0uODZjMCwxOS4zOC0zLjgyLDMzLjYyLTEwLjMyLDQ0Ljg3QzI3MSwxODAuMTMsMjU4LjcyLDE5MSwyMzguMTMsMTkxYy0xMi44LDAtMjQuMTQtMi43OC0zNi42OC0xNC42MS05LjY0LTkuMDgtMjAuOTEtMjUuMjEtMjkuNTgtMzkuNzFMMTQ2LjA4LDkzLjZjLTEyLjk0LTIxLjYyLTI0LjgxLTM3Ljc0LTMxLjY4LTQ1QzEwNyw0MC43MSw5Ny41MSwzMS4yMyw4Mi4zNSwzMS4yM2MtMTIuMjcsMC0yMi42OSw4LjYxLTMxLjQxLDIxLjc4WiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTgyLjM1LDMxLjIzYy0xMi4yNywwLTIyLjY5LDguNjEtMzEuNDEsMjEuNzhDMzguNjEsNzEuNjIsMzEuMDYsOTkuMzQsMzEuMDYsMTI2YzAsMTEsMi40MSwxOS40MSw1LjU2LDI0LjUxTDEwLjE0LDE2Ny45MUMzLjM0LDE1Ni42LDAsMTQxLjc2LDAsMTI0Ljg1LDAsOTQuMSw4LjQ0LDYyLjA1LDI0LjQ5LDM3LjMsMzguNzMsMTUuMzUsNTkuMjgsMCw4Mi44NSwwWiIvPjwvc3ZnPg=='
    },
    {
      id: 2,
      name: 'Instagram',
      status: 'connected',
      link: 'https://instagram.com',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png'
    },
    {
      id: 3,
      name: 'TikTok',
      status: 'disconnected',
      link: 'https://tiktok.com',
      image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzMzMzUgMzMzMzM2IiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiIgdGV4dC1yZW5kZXJpbmc9Im9wdGltaXplTGVnaWJpbGl0eSIgaW1hZ2UtcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNzI0NjQgMGgxODg0MDdjMzk4NTYgMCA3MjQ2NCAzMjYwOSA3MjQ2NCA3MjQ2NXYxODg0MDdjMCAzOTg1NS0zMjYwOCA3MjQ2NC03MjQ2NCA3MjQ2NEg3MjQ2NEMzMjYwOCAzMzMzMzYgMCAzMDA3MjcgMCAyNjA4NzJWNzI0NjVDMCAzMjYwOSAzMjYwOCAwIDcyNDY0IDB6bTEyNzY2NCA3MDY0MmMzMzcgMjg3NyA4MjUgNTY2MSAxNDYxIDgzNDFsNjMwNCAyYzExNzAgOTk5MSA0MDA2IDE5MTE5IDg0NjUgMjY2OTcgNzI4MiA2NzQ1IDE2Nzk3IDEwOTA0IDI4MjgwIDExNjQxdjkyMDhjMjEzMSA0NDQgNDM1MCA3NDYgNjY1OSA4OTR2Mjk2OTBjLTE0ODQ3IDE0NjItMjc4NDEtMzQyNi00Mjk4MS0xMjUzMWwyMzI0IDUwODQ3YzAgMTYzOTggNjEgMjM4OTItODczOCAzODk3Ny0yMDU0NiAzNTIyMi01ODE5NCAzNjY3Ny04MjE3NiAxODMyMy0xMjI2OS00MjU2LTIzMDY5LTEyNDY2LTI5ODgxLTIzNjEyLTE5ODc1LTMyNTE2LTE5NTktODU1MTIgNTU2ODctOTA5NjZsLTk0IDc4MzV2MTk3MGMzMTA1LTY0NiA2MzY1LTExNDQgOTc5NC0xNDY4djMxMzExYy0xMjQ4NCAyMDU3LTIwNDEyIDU4OTAtMjQxMTkgMTI5ODAtNzQyNCAxNDE5Ny00MDQ5IDI2NTI2IDM3MTYgMzQzMDkgMTYyNzYgMjc5NiAzNDQwMS04NDgxIDMxNjczLTQzMzUxVjcwNjQ0aDMzNjI4eiIgZmlsbD0iIzFhMTIxZiIvPjxwYXRoIGQ9Ik0yMDAxMjggNzA2NDJjMzA5MyAyNjQwNiAxODkxNSA0NTAzOCA0NDUxMCA0NjY4MXYyNTA0NmwtMTY1IDE1di0yMTI3NWMtMjU1OTUtMTY0Mi00MDMxMS0xNzM5MC00MzQwNC00Mzc5NmwtMjcxMTQtMXYxMTEwOTVjMzkxMiA1MDAwNS0zNTA1MCA1MTQ5MC00OTk1NSAzMjUzMSAxNzQ4MiAxMDkzNCA0NTg2NyAzODI2IDQyNTAxLTM5MjAyVjcwNjQxaDMzNjI4em0tNzI4NTQgMTg0MTY1Yy0xNTMxOS0zMTUzLTI5MjQ5LTEyMzA2LTM3NDMwLTI1Njg5LTE5ODc1LTMyNTE2LTE5NTktODU1MTIgNTU2ODctOTA5NjZsLTk0IDc4MzVjLTUzNDQ0IDg1MTItNTg4MDkgNjU5MjAtNDQwMDkgODk4MDIgNTcwNyA5MjA5IDE1MDc2IDE1Njg2IDI1ODQ2IDE5MDE5eiIgZmlsbD0iIzI2ZjRlZSIvPjxwYXRoIGQ9Ik0yMDc4OTIgNzg5ODVjMTc2MSAxNTAzNiA3MjkzIDI4MTE5IDE2NDU0IDM2OTAzLTEyODY2LTY2NTUtMjA2MzAtMTkzMTUtMjMwNjItMzY5MDVsNjYwOSAyem0zNjU4MCA0NzUxMWMyMTgxIDQ2MyA0NDU2IDc3NyA2ODI0IDkyOXYyOTY5MGMtMTQ4NDcgMTQ2Mi0yNzg0MS0zNDI1LTQyOTgxLTEyNTMxbDIzMjQgNTA4NDdjMCAxNjM5OCA2MSAyMzg5Mi04NzM4IDM4OTc3LTIxNDQzIDM2NzYwLTYxNTE3IDM2NzQzLTg1MjM5IDE1ODEwIDMwOTMwIDE3NzY1IDg0OTI4IDM4NTcgODQ4MjktNTY0NTN2LTU1NDk2YzE1MTQxIDkxMDUgMjgxMzQgMTM5OTMgNDI5ODEgMTI1M3YtMjQzMDJ6bS05OTAzNiAyMTQ2MGMzMTA1LTY0NiA2MzY1LTExNDQgOTc5NC0xNDY4djMxMzExYy0xMjQ4NCAyMDU3LTIwNDEyIDU4OTAtMjQxMTkgMTI5ODAtMTA0NDEgMTk5NjQgNDc0IDM2MjM4IDE0OTIzIDQxMzY1LTE4MDc1LTY0OS0zNjAxMC0xOTIxNC0yMzU1NS00MzAzMSAzNzA3LTcwODkgMTA0NzQtMTA5MjMgMjI5NTgtMTI5ODB2LTI4MTc3eiIgZmlsbD0iI2ZiMmM1MyIvPjxwYXRoIGQ9Ik0yMDEwNjggNzczMTNjMzA5MyAyNjQwNiAxNzgwOSA0MjE1NCA0MzQwNCA0Mzc5NnYyOTY4OWMtMTQ4NDcgMTQ2Mi0yNzg0MS0zNDI1LTQyOTgxLTEyNTMwdjU1NDk2YzExOSA3MjQzMy03NzgwMiA3Nzk0NS0xMDAwNjMgNDIwMjUtMTQ4MDAtMjM4ODEtOTQzNS04MTI5MCA0NDAwOS04OTgwMnYzMDE0N2MtMTI0ODMgMjA1Ny0xOTI1MCA1ODkxLTIyOTU4IDEyOTgwLTIyOTA5IDQzODA4IDU2OTk3IDY5ODcyIDUxNDc1LTcwNlY3NzMxM2wyNzExNCAxeiIgZmlsbD0iI2ZlZmVmZSIvPjwvc3ZnPg=='
    }
  ];

  const availableConnectors = [
    {
      id: 4,
      name: 'X',
      description: 'Connect your X (Twitter) account for social media management',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/1024px-X_icon_2.svg.png',
      customIcon: true
    },
    {
      id: 5,
      name: 'LinkedIn',
      description: 'Professional networking and B2B marketing integration',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png'
    },
    {
      id: 6,
      name: 'YouTube',
      description: 'Video content management and analytics',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png'
    },
    {
      id: 7,
      name: 'Pinterest',
      description: 'Visual content discovery and marketing',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/600px-Pinterest-logo.png'
    },
    {
      id: 8,
      name: 'Snapchat',
      description: 'Ephemeral content and AR advertising',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1024px-Snapchat_logo.svg.png'
    },
    {
      id: 9,
      name: 'Google Ads',
      description: 'Search and display advertising management',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Ads_logo.svg/1024px-Google_Ads_logo.svg.png'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-500';
      case 'disconnected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'disconnected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const renderConnectorIcon = (connector: any) => {
    if (connector.customIcon && connector.name === 'X') {
      return (
        <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-black flex items-center justify-center">
          <svg className="h-8 w-8 fill-white" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      );
    }
    return <img src={connector.image} alt={connector.name} className="w-16 h-16 rounded-full mx-auto mb-3" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="p-6">
        {/* Header Section - Updated to match Analytics exactly */}
        <div className="relative bg-gradient-to-r from-purple-50 to-blue-50 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-blue-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-purple-200/20 rounded-full blur-xl animate-pulse delay-500"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-200/15 rounded-full blur-lg animate-pulse delay-700"></div>
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #8b5cf6 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}></div>
          </div>

          {/* Header Content */}
          <div className="relative z-10 p-8 pb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-purple-200/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-purple-300/30 shadow-lg">
                    <Cable className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2 drop-shadow-sm">
                    Connectors
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Integrate your favorite platforms to streamline your marketing efforts
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent"></div>
        </div>

        {/* Connected Platforms */}
        <div className="mb-8 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Platforms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedPlatforms.map((platform) => (
              <div key={platform.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 flex items-center space-x-4">
                <img src={platform.image} alt={platform.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-medium text-gray-900">{platform.name}</h4>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className={getStatusColor(platform.status)}>
                      {getStatusIcon(platform.status)}
                    </span>
                    <span>{platform.status}</span>
                    {platform.status === 'connected' && (
                      <Link to={platform.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        <ExternalLink className="w-4 h-4 inline-block ml-1" />
                        Manage
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Connectors */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Connectors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableConnectors.map((connector) => (
              <div key={connector.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
                {renderConnectorIcon(connector)}
                <h4 className="font-medium text-gray-900 text-center mb-2">{connector.name}</h4>
                <p className="text-sm text-gray-600 text-center mb-4">{connector.description}</p>
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Connect</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connectors;
