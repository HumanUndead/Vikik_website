import React, { useEffect, useState } from "react";
import { Database, Lock, CheckCircle, Loader2 } from "lucide-react";
import { ProdImporter, ProductImporterLockStatus } from "src/api/routs";
import Button from "@components/ui/button";

function ImporterProducts() {
  const [locked, setLocked] = useState<boolean | null>(null);

  const handleImport = async () => {
    try {
      const response = await ProductImporterLockStatus();
      setLocked(response.IsLocked);
    } catch (error) {
      console.error("Error fetching import status:", error);
    }
  };

  const deletedImporter = async () => {
    const response = await ProdImporter();
    window.location.reload();
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkLockStatus = async () => {
      await handleImport();
      timeoutId = setTimeout(checkLockStatus, 2 * 60 * 1000);
    };

    checkLockStatus();

    return () => clearTimeout(timeoutId);
  }, [locked]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-violet-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg mx-auto p-6">
          {/* Card Wrapper */}
          <div className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
            {/* Header */}
            <div className="text-center px-8 pt-8 pb-6">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110">
                    <Database className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent mb-3">
                Product Importer Control
              </h1>

              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Manage your product import operations
              </p>
            </div>

            {/* Original Component Content with Styling Wrapper */}
            <div className="px-8 pb-8">
              <div className="flex flex-col items-center justify-center p-4">
                <Button
                  className="w-full sm:w-auto"
                  disabled={locked === true}
                  onClick={deletedImporter}
                >
                  {locked == true
                    ? "Importer Products locked"
                    : "Import Products"}
                </Button>
                <div className="mt-8">
                  {locked !== null && (
                    <div
                      className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                        locked
                          ? "border-red-200 bg-gradient-to-br from-red-50 to-pink-50 dark:border-red-700 dark:from-red-950/50 dark:to-pink-950/50"
                          : "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-700 dark:from-green-950/50 dark:to-emerald-950/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={locked ? "text-red-500" : "text-green-500"}
                        >
                          {locked ? (
                            <Lock className="h-5 w-5" />
                          ) : (
                            <CheckCircle className="h-5 w-5" />
                          )}
                        </div>
                        <p
                          className={`font-medium ${
                            locked
                              ? "text-red-900 dark:text-red-100"
                              : "text-green-900 dark:text-green-100"
                          }`}
                        >
                          Status:{" "}
                          {locked
                            ? "The products are not available"
                            : "The products are available"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Status Indicator */}
            <div className="px-8 pb-6">
              <div className="flex items-center justify-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      locked === null
                        ? "bg-amber-400 animate-pulse"
                        : locked
                        ? "bg-red-400"
                        : "bg-green-400"
                    }`}
                  ></div>
                  <Loader2
                    className="h-3 w-3 animate-spin"
                    style={{ animationDuration: "3s" }}
                  />
                </div>
                <span className="font-medium">
                  Auto-refresh every 2 minutes
                </span>
              </div>

              {/* Progress Bar */}
            </div>
          </div>

          {/* Floating Elements */}
          <div
            className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-60 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-60 animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ImporterProducts;
